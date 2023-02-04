import dayjs from 'dayjs';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import jsCookie from 'js-cookie';
import { useEffect, useRef } from 'react';
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
import movePng from '../../../assets/move.png';
import { Canvas } from '../classes/canvas.class';
import { Doodle } from '../classes/line.class';

export const useInitializeCanvas = () => {
  const { drawSettings, currentTab, eraserSettings, canvasSettings } =
    useDrawingContext();

  const coordinatesRef = useRef<Doodle[]>([]);

  useEffect(() => {
    const { canvas, context } = Canvas.getElements();
    const canvasContainer = document.getElementById('canvas_container');

    if (canvasContainer) {
      const width = canvasContainer.clientWidth;
      const height = canvasContainer.clientHeight;

      const scale = 1;
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

      const progress = localStorage.getItem('progress');
      if (progress) {
        Canvas.loadImgURLToCanvas(progress).finally(() => {
          context.scale(scale, scale);
        });
      }
    }
  }, []);

  useEffect(() => {
    const { canvas, context } = Canvas.getElements();

    if (currentTab === 'eraser') {
      canvas.style.cursor = `url(${eraserPng}), auto`;
      context.globalCompositeOperation = 'destination-out';
    } else if (currentTab === 'canvas') {
      canvas.style.cursor = `url(${movePng}), auto`;
      context.globalCompositeOperation = 'source-over';
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

    let drawable = false;
    let points: any[] = [];
    let move = false;
    let doodle: Doodle;
    let doodleSelected: Doodle | undefined;

    const onDrawingStop = (e) => {
      if (drawable) {
        if (doodle.getPoints().length > 1 && drawSettings.smooth_line) {
          doodle.addSmoothness();
        }

        Canvas.storeImageData();
        points = [];
        canvas.style.border = 'none';
        drawable = false;
        context.beginPath();
      } else if (move) {
        move = false;
      }
    };

    canvas.onmousedown = (e) => {
      if (currentTab === 'draw' && drawSettings.delete) {
        doodleSelected = coordinatesRef.current.find((line) =>
          line.isSelected(e.offsetX, e.offsetY)
        );

        if (doodleSelected) {
          Canvas.putImageData();
          context.save();
          context.strokeStyle = 'yellow';
          context.lineWidth = 2;

          const { x_max, x_min, y_max, y_min } =
            doodleSelected.calculateBoxDimensions();
          context.strokeRect(
            x_min - 2,
            y_min - 2,
            x_max - x_min + 4,
            y_max - y_min + 4
          );

          context.restore();
        }
      } else if (currentTab === 'draw' || currentTab === 'eraser') {
        drawable = true;
        Canvas.storeImageData();
        context.moveTo(e.offsetX, e.offsetY);

        points.push({ x: e.offsetX, y: e.offsetY });
        canvas.style.border = '1px yellow solid';
        doodle = new Doodle();
        coordinatesRef.current.push(doodle);
      } else if (currentTab === 'canvas') {
        move = true;
      }
    };

    canvas.onmouseup = onDrawingStop;

    canvas.onmouseleave = onDrawingStop;

    canvas.onmousemove = (e) => {
      if (drawable) {
        if (!drawSettings.line) {
          doodle.addPoints(e.offsetX, e.offsetY);
          context.lineTo(e.offsetX, e.offsetY);
        } else {
          context.beginPath();
          Canvas.clearCanvas();

          Canvas.putImageData();
          context.moveTo(points[0].x, points[0].y);
          context.lineTo(e.offsetX, e.offsetY);
        }

        context.stroke();
      } else if (move) {
        canvas.style.left = `${
          parseInt(canvas.style.left || window.getComputedStyle(canvas).left) +
          e.movementX
        }px`;

        canvas.style.top = `${
          parseInt(canvas.style.top || window.getComputedStyle(canvas).top) +
          e.movementY
        }px`;
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

    window.onkeydown = (e) => {
      if (e.code === 'Delete') {
        if (doodleSelected) {
          Canvas.clearCanvas();
          coordinatesRef.current = coordinatesRef.current.filter(
            (v) => v.id !== doodleSelected?.id
          );

          coordinatesRef.current.forEach((v) => {
            v.drawAgain();
          });

          Canvas.storeImageData();
        }
      }
    };
  }, [
    drawSettings.smooth_line,
    drawSettings.line,
    currentTab,
    drawSettings.delete,
  ]);

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
