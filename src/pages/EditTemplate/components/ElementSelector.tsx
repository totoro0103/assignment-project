import { ElementTypes, Element as IElement } from "../../../types";
import { makeId } from "../../../utils";
import {
  getParagraphElementSettings,
  getSpacerElementSettings,
  getHeadingElementSettings,
  getImageElementSettings,
} from "../../../utils/elementSettingsGenerator";

type ElementSelectorProps = { onSelect: (data: IElement) => void };

export const ElementSelector: React.FC<ElementSelectorProps> = ({
  onSelect,
}) => {
  const options = [
    {
      id: makeId(),
      label: "Spacer Settings",
      type: ElementTypes.Spacer,
      stringHtml: "<div/>",
      settings: getSpacerElementSettings(),
    },
    {
      id: makeId(),
      label: "Title Settings",
      type: ElementTypes.Heading,
      stringHtml: "<h1/>",
      defaultStyles: [
        {
          key: "workBreak",
          value: "break-all",
        },
      ],
      settings: getHeadingElementSettings(),
    },
    {
      id: makeId(),
      label: "Image Settings",
      type: ElementTypes.Image,
      stringHtml: "<img />",
      defaultStyles: [
        {
          key: "height",
          value: "100%",
        },
        {
          key: "objectFit",
          value: "cover",
        },
        {
          key: "maxWidth",
          value: "100%",
        },
      ],
      settings: getImageElementSettings({
        textAlign: "left",
      }),
    },
    {
      id: makeId(),
      label: "Spacer Settings",
      type: ElementTypes.Spacer,
      stringHtml: "<div/>",
      settings: getSpacerElementSettings(),
    },
    {
      id: makeId(),
      label: "Paragraph Settings",
      type: ElementTypes.Paragraph,
      stringHtml: "<p/>",
      defaultStyles: [
        {
          key: "workBreak",
          value: "break-all",
        },
      ],
      settings: getParagraphElementSettings(),
    },
  ];

  return (
    <div className='element-selector__container'>
      {options.map((option) => (
        <button
          key={option.id}
          className='element-selector__button'
          onClick={() => onSelect(option)}>
          {option.label.replace("Settings", "")}
        </button>
      ))}
    </div>
  );
};
