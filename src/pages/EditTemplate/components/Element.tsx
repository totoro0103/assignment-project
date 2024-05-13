import { ElementSettingsApplyAs, Element as IElement } from "../../../types";
import { clsx } from "clsx";
import { Tooltip } from "../../../components/Element/Tooltip";

import parse from "html-react-parser";

type ElementProps = {
  data: IElement;
  isSelected: boolean;
  onSelect: (element: IElement) => void;
};

export const Element: React.FC<ElementProps> = ({
  data,
  isSelected,
  onSelect,
}) => {
  const getHtmlFromSettings = () => {
    const divContainer = document.createElement("div");
    divContainer.innerHTML = data.stringHtml;
    divContainer.style.width = "100%";
    const htmlElement = divContainer.firstChild as
      | HTMLElement
      | HTMLImageElement;

    if (data.defaultStyles) {
      data.defaultStyles.forEach((style) => {
        htmlElement.style[style.key] = style.value;
      });
    }

    data.settings.forEach((setting) => {
      switch (setting.applyAs) {
        case ElementSettingsApplyAs.Attribute:
          htmlElement.setAttribute(setting.key, setting.value);
          break;
        case ElementSettingsApplyAs.InterText:
          htmlElement.innerText = setting.value;
          break;
        case ElementSettingsApplyAs.ParentStyle:
          divContainer.style[setting.key] = setting.value;
          break;
        default:
          htmlElement.style[setting.key] = setting.value;
      }
    });

    return divContainer.outerHTML;
  };

  const html = getHtmlFromSettings();
  return (
    <Tooltip text={data.label.replace("Settings", "")}>
      <div
        className={clsx(
          "edit-template__element-item",
          isSelected && "edit-template__element-item_selected"
        )}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(data);
        }}>
        {parse(html)}
      </div>
    </Tooltip>
  );
};
