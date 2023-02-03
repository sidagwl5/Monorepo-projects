import dayjs from 'dayjs';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import jsCookie from 'js-cookie';
import { useEffect } from 'react';
import {
  browserName,
  browserVersion,
  deviceType,
  osName,
  osVersion,
} from 'react-device-detect';
import { firestore } from '../configs/firebase.config';
import { useDrawingContext } from './../Context';
import penPng from '../../../assets/pen.png';
import eraserPng from '../../../assets/eraser.png';
import { Canvas } from '../classes/canvas.class';

export const useInitializeCanvas = () => {
  const { drawSettings, currentTab, eraserSettings, canvasSettings } =
    useDrawingContext();

  useEffect(() => {
    const { canvas, context } = Canvas.getElements();
    const canvasContainer = document.getElementById('canvas_container');

    if (canvasContainer) {
      const width = canvasContainer.clientWidth;
      const height = canvasContainer.clientHeight;

      const scale = 3;
      if (width < height) {
        canvas.style.width = `${width - 50}px`;
        canvas.style.height = `${(5 / 6) * width}px`;

        canvas.width = (width - 50) * scale;
        canvas.height = (5 / 6) * width * scale;
      } else {
        canvas.style.height = `${height - 50}px`;
        canvas.style.width = `${(5 / 6) * height}px`;

        canvas.height = (height - 50) * scale;
        canvas.width = (5 / 6) * height * scale;
      }

      // const progress = localStorage.getItem('progress');
      // if (progress) {
      //   Canvas.loadImgURLToCanvas(progress).finally(() => {
      //     context.scale(scale, scale);
      //   });
      // }

      context.scale(scale, scale);
    }
  }, []);

  useEffect(() => {
    const { canvas, context } = Canvas.getElements();

    if (currentTab === 'eraser') {
      canvas.style.cursor = `url(${eraserPng}), auto`;
      context.globalCompositeOperation = 'destination-out';
    } else {
      canvas.style.cursor = `url(${penPng}), auto`;
      context.globalCompositeOperation = 'source-over';
    }
  }, [currentTab]);

  useEffect(() => {
    const { context } = Canvas.getElements();

    if (currentTab === 'eraser') {
      context.lineWidth = Number(eraserSettings.width);
    } else {
      context.lineWidth = Number(drawSettings.width);
    }
  }, [currentTab, drawSettings.width, eraserSettings.width]);

  useEffect(() => {
    const { context } = Canvas.getElements();

    if (context) {
      context.strokeStyle = drawSettings.color;
      context.lineJoin = drawSettings.round_line_join ? 'round' : 'miter';
      context.lineCap = drawSettings.round_line_cap ? 'round' : 'butt';
    }
  }, [drawSettings]);

  useEffect(() => {
    const { canvas } = Canvas.getElements();

    canvas.style.backgroundColor = canvasSettings.bg_color;
  }, [canvasSettings.bg_color]);

  useEffect(() => {
    const { context, canvas } = Canvas.getElements();

    let coordinates: any[] = [];
    let drawable = false;
    let points: any[] = [];

    const onDrawingStop = () => {
      if (drawable) {
        if (coordinates.length > 1 && drawSettings.smooth_line) {
          context.beginPath();

          Canvas.clearCanvas();
          Canvas.putImageData();
          context.moveTo(coordinates[0].x, coordinates[0].y);

          let i;
          for (i = 1; i < coordinates.length - 2; i++) {
            const xc = (coordinates[i].x + coordinates[i + 1].x) / 2;
            const yc = (coordinates[i].y + coordinates[i + 1].y) / 2;
            context.quadraticCurveTo(
              coordinates[i].x,
              coordinates[i].y,
              xc,
              yc
            );
          }
          // curve through the last two coordinates
          context.quadraticCurveTo(
            coordinates[i].x,
            coordinates[i].y,
            coordinates[i + 1].x,
            coordinates[i + 1].y
          );

          context.stroke();
        }

        Canvas.storeImageData();
        points = [];
        canvas.style.border = 'none';
        drawable = false;
        coordinates = [];
        context.beginPath();
      }
    };

    canvas.onmousedown = (e) => {
      drawable = true;

      Canvas.storeImageData();
      context.moveTo(e.offsetX, e.offsetY);
      coordinates.push({ x: e.offsetX, y: e.offsetY });
      points.push({ x: e.offsetX, y: e.offsetY });
      canvas.style.border = '1px yellow solid';
    };

    canvas.onmouseup = onDrawingStop;

    canvas.onmouseleave = onDrawingStop;

    canvas.onmousemove = (e) => {
      if (drawable) {
        if (!drawSettings.line) {
          coordinates.push({ x: e.offsetX, y: e.offsetY });
          context.lineTo(e.offsetX, e.offsetY);
        } else {
          context.beginPath();
          Canvas.clearCanvas();

          Canvas.putImageData();
          context.moveTo(points[0].x, points[0].y);
          context.lineTo(e.offsetX, e.offsetY);
        }

        context.stroke();
      }
    };

    canvas.ontouchstart = (e) => {
      e.preventDefault();

      const mouseDown = new MouseEvent('mousedown', {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      });
      canvas.dispatchEvent(mouseDown);
    };

    canvas.ontouchend = (e) => {
      const mouseEnd = new MouseEvent('mouseup');
      canvas.dispatchEvent(mouseEnd);
    };

    canvas.ontouchcancel = (e) => {
      const mouseEnd = new MouseEvent('mouseup');
      canvas.dispatchEvent(mouseEnd);
    };

    canvas.ontouchmove = (e) => {
      const mouseDown = new MouseEvent('mousemove', {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      });
      canvas.dispatchEvent(mouseDown);
    };
  }, [drawSettings.smooth_line, drawSettings.line]);

  useEffect(() => {
    const getAnalytics = async () => {
      let id;

      if (jsCookie.get('uniqueId')) {
        id = jsCookie.get('uniqueId');
      } else {
        id = crypto.randomUUID();
        jsCookie.set('uniqueId', id, {
          expires: dayjs().add(1, 'year').toDate(),
        });
      }

      const collectionRef = collection(firestore, 'visitors');
      const docRef = doc(collectionRef, id);
      const docDetails = await getDoc(docRef);

      if (!docDetails.exists()) {
        await setDoc(docRef, {
          osName,
          osVersion,
          deviceType,
          browserName,
          browserVersion,
          visits: 1,
        });
      } else {
        await updateDoc(docRef, { visits: docDetails.data().visits + 1 });
      }
    };

    getAnalytics();
  }, []);
};
