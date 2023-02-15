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
import { Canvas } from '../classes/canvas.class';
import { firestore } from '../configs/firebase.config';
import { useDrawingContext } from './../Context';

export const useInitializeCanvas = (setLoading: any) => {
  const { currentAspectRatio } = useDrawingContext();

  useEffect(() => {
    const { canvas, context } = Canvas.getElements();
    const canvasContainer = document.getElementById('canvas_container');

    if (canvasContainer) {
      const width = canvasContainer.clientWidth;
      const height = canvasContainer.clientHeight;

      let elementWidth;
      let elementHeight;

      const scale = 3;
      const diff = 25;

      elementWidth = width - diff;
      elementHeight = (1 / currentAspectRatio) * elementWidth;

      if (elementHeight > height) {
        elementHeight = height - diff;
        elementWidth = currentAspectRatio * elementHeight;
      }

      context.save();
      canvas.style.width = `${elementWidth}px`;
      canvas.style.height = `${elementHeight}px`;

      canvas.width = elementWidth * scale;
      canvas.height = elementHeight * scale;

      context.restore();

      const progress = localStorage.getItem('progress');
      if (progress) {
        Canvas.loadImgURLToCanvas(progress).finally(() => {
          context.scale(scale, scale);
        });
      } else context.scale(scale, scale);

      setTimeout(() => setLoading(false), 1000);
    }
  }, []);

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

      const collectionRef = collection(firestore, 'visitors_1');
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
