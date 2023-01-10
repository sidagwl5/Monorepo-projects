import { tw, css } from 'twind/style';
import { cloneDeep } from 'lodash-es';

export const Sidebar = ({
  options,
  stateOptions,
  setOptions,
}: {
  options: any[];
  stateOptions: any[];
  setOptions: (value: any) => void;
}) => {
  const [active, setActive] = stateOptions;

  return (
    <section className={tw('flex max-w-[400px]')}>
      <section
        className={tw(
          'min-w-[50px] relative bg-[#282222]',
          css({
            '&': { gridArea: 'sidebar', borderRight: '1px solid #574545' },
          })
        )}
        id="sidebar"
      >
        {options.map(({ icon }: any, index: number) => (
          <div
            key={index}
            onClick={setActive.bind(this, index)}
            className={tw(
              'w-full h-[50px] hover:bg-[#3E3E3E] cursor-pointer flex items-center justify-center relative',
              active === index && 'bg-primaryTextColor!'
            )}
          >
            {icon}
          </div>
        ))}
      </section>

      <section className={tw('w-[250px] bg-[#282222] p-3 text-white')}>
        <h2 className={tw('text-xl font-medium')}>{options[active].title}</h2>

        <div className={tw('w-full mt-4')}>
          {options[active].options.map((v: any, idx: number) => (
            <input
              className={tw('w-full')}
              onChange={(e) => {
                const newOptions = [...options];
                const newObj = { ...newOptions[active] };

                newOptions[active].options[idx].props.value =
                  e.currentTarget.value;
                newOptions[active] = newObj;
                setOptions(newOptions);
              }}
              type="range"
              {...v.props}
            />
          ))}
        </div>
      </section>
    </section>
  );
};
