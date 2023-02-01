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

export const useInitializeCanvas = () => {
  const { drawSettings, currentTab, eraserSettings, canvasSettings } =
    useDrawingContext();

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;

    const canvasContainer = document.getElementById('canvas_container');
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    if (canvasContainer) {
      const width = canvasContainer.clientWidth;
      const height = canvasContainer.clientHeight;

      const scale = 3;
      if (width < height) {
        canvasElement.style.width = `${width - 50}px`;
        canvasElement.style.height = `${(5 / 6) * width}px`;

        canvasElement.width = (width - 50) * scale;
        canvasElement.height = (5 / 6) * width * scale;
      } else {
        canvasElement.style.height = `${height - 50}px`;
        canvasElement.style.width = `${(5 / 6) * height}px`;

        canvasElement.height = (height - 50) * scale;
        canvasElement.width = (5 / 6) * height * scale;
      }

      context.scale(scale, scale);
    }
  }, []);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    if (currentTab === 'eraser')
      context.globalCompositeOperation = 'destination-out';
    else context.globalCompositeOperation = 'source-over';
  }, [currentTab]);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    if (currentTab === 'eraser') {
      context.lineWidth = Number(eraserSettings.width);
    } else {
      context.lineWidth = Number(drawSettings.width);
    }
  }, [currentTab, drawSettings.width, eraserSettings.width]);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    if (context) {
      context.strokeStyle = drawSettings.color;
      context.lineJoin = drawSettings.round_line_join ? 'round' : 'miter';
      context.lineCap = drawSettings.round_line_cap ? 'round' : 'butt';
    }
  }, [drawSettings]);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;

    canvasElement.style.backgroundColor = canvasSettings.bg_color;
  }, [canvasSettings.bg_color]);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    let coordinates: any[] = [];
    let snapshot: ImageData | null = null;
    let drawable = false;

    const onDrawingStop = () => {
      if (drawable) {
        if (coordinates.length > 1 && drawSettings.smooth_line) {
          context.beginPath();
          context.clearRect(0, 0, canvasElement.width, canvasElement.height);
          if (snapshot) context.putImageData(snapshot, 0, 0);
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

        snapshot = null;
        canvasElement.style.border = 'none';
        drawable = false;
        coordinates = [];
        context.beginPath();
      }
    };

    canvasElement.onmousedown = (e) => {
      snapshot = context.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      drawable = true;
      context.moveTo(e.offsetX, e.offsetY);
      coordinates.push({ x: e.offsetX, y: e.offsetY });

      canvasElement.style.border = '1px yellow solid';
    };

    canvasElement.onmouseup = onDrawingStop;

    canvasElement.onmouseleave = onDrawingStop;

    canvasElement.onmousemove = (e) => {
      if (drawable) {
        coordinates.push({ x: e.offsetX, y: e.offsetY });
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
      }
    };

    canvasElement.ontouchstart = (e) => {
      e.preventDefault();

      const mouseDown = new MouseEvent('mousedown', {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      });
      canvasElement.dispatchEvent(mouseDown);
    };

    canvasElement.ontouchend = (e) => {
      const mouseEnd = new MouseEvent('mouseup');
      canvasElement.dispatchEvent(mouseEnd);
    };

    canvasElement.ontouchcancel = (e) => {
      const mouseEnd = new MouseEvent('mouseup');
      canvasElement.dispatchEvent(mouseEnd);
    };

    canvasElement.ontouchmove = (e) => {
      const mouseDown = new MouseEvent('mousemove', {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      });
      canvasElement.dispatchEvent(mouseDown);
    };
  }, [drawSettings.smooth_line]);

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

  // useEffect(() => {
  //   const canvasElement = document.getElementById(
  //     'canvas'
  //   ) as HTMLCanvasElement;
  //   const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

  //   window.addEventListener('resize', (e) => {
  //     const backupCanvas = document.createElement('canvas');
  //     const backupCanvasContext = backupCanvas.getContext(
  //       '2d'
  //     ) as CanvasRenderingContext2D;

  //     backupCanvas.width = canvasElement.width;
  //     backupCanvas.height = canvasElement.height;

  //     const canvasContainer = document.getElementById('canvas_container');

  //     backupCanvasContext.drawImage(canvasElement, 0, 0);
  //     if (canvasContainer) {
  //       const width = canvasContainer.clientWidth;
  //       const height = canvasContainer.clientHeight;

  //       if (width < height) {
  //         canvasElement.width = width - 50;
  //         canvasElement.height = (3 / 4) * width;
  //       } else {
  //         canvasElement.height = height - 50;
  //         canvasElement.width = (3 / 4) * height;
  //       }
  //     }
  //     context.drawImage(backupCanvas, 0, 0);
  //   });
  // }, []);

  return null;
};
