import { useMemo } from "react";
import { ElementSettingTypes, ElementSettings } from "../../../types";

type ElementSettingItemProps = {
  data: ElementSettings;
  onChange: (value: any) => void;
};

export const ElementSettingItem: React.FC<ElementSettingItemProps> = ({
  data,
  onChange,
}) => {
  const controlComponent = useMemo(() => {
    switch (data.type) {
      case ElementSettingTypes.Slider:
        return (
          <input
            type='range'
            min='0'
            max={"1920"}
            value={parseInt(data.value.replace("px", ""))}
            className='slider'
            onChange={(e) => onChange(e.target.value + "px")}
          />
        );

      case ElementSettingTypes.Input:
        return (
          <input
            value={data.value}
            className='input-text'
            onChange={(e) =>
              onChange(
                e.target.value ||
                  "https://via.placeholder.com/300x300.png?text=placeholder+image"
              )
            }
          />
        );

      case ElementSettingTypes.GroupButton:
        return (
          <div className='button-group'>
            {data.options?.map((option) => (
              <button
                key={option.value}
                className={option.value === data.value ? "selected" : ""}
                onClick={() => onChange(option.value)}>
                {option.label}
              </button>
            ))}
          </div>
        );
      case ElementSettingTypes.RadioButtonGroups:
        return (
          <div className='radio-button-group'>
            {data.options?.map((option) => (
              <div key={option.value}>
                <input
                  type='radio'
                  id={option.value}
                  name={option.value}
                  value={data.value}
                  checked={data.value === option.value}
                  onChange={() => onChange(option.value)}
                />
                <label htmlFor='option1'>{option.label}</label>
              </div>
            ))}
          </div>
        );

      case ElementSettingTypes.Textarea:
        return (
          <textarea
            className='textarea'
            value={data.value}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case ElementSettingTypes.ColorPicker:
        return (
          <input
            className='color-picker'
            type='color'
            id='color-picker'
            value={data.value}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      default:
        return <div>abc</div>;
    }
  }, [data]);

  return (
    <div className='edit-template__page-settings-item'>
      <div className='title-container'>
        <span className='title'>{data.label}</span>
        <span className='value'>{data.value}</span>
      </div>
      {controlComponent}
    </div>
  );
};
