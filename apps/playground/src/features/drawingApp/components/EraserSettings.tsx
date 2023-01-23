import { css, tw } from 'twind/style';
import { useDrawingContext } from '../Context';

export const EraserSettings = () => {
  const { eraserSettings, setEraserSettings } = useDrawingContext();

  return (
    <div className={tw('text-white flex flex-col gap-1')}>
      <p className={tw('font-medium text-sm capitalize')}>Eraser width</p>
      <input
        className={tw(
          'px-2 py-1 rounded-md',
          css({ background: 'rgba(255, 255, 255, 0.12)' })
        )}
        value={eraserSettings.width as string}
        onChange={(e) =>
          setEraserSettings((prev: any) => ({
            ...prev,
            width: e.target.value,
          }))
        }
        type="text"
      />
    </div>
  );
};
