import { ElementSettingsApplyAs, Element as IElement } from "../../../types";
import { clsx } from "clsx";
import { Tooltip } from "../../../components/Element/Tooltip";
import { MdOutlineClose } from "react-icons/md";
import { MdAdd } from "react-icons/md";

import parse from "html-react-parser";
import { ElementSelector } from "./ElementSelector";

type ElementProps = {
  data: IElement;
  isSelected: boolean;
  onSelect: (element: IElement) => void;
  onRemove: (element: IElement) => void;
  onChangeSelectorState: (element: IElement) => void;
  onAddElement: (element: IElement) => void;
};

export const Element: React.FC<ElementProps> = ({
  data,
  isSelected,
  onSelect,
  onRemove,
  onChangeSelectorState,
  onAddElement,
}) => {
  const getHtmlFromSettings = () => {
    const divContainer = document.createElement("div");
    divContainer.innerHTML = data.stringHtml;
    divContainer.style.width = "100%";
    const htmlElement = divContainer.firstChild as
      | HTMLElement
      | HTMLImageElement;
    if (data.defaultStyles) {
      htmlElement.style.wordBreak = "break-all";
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
      <div>
        {data.isAddSelectorTop && (
          <div className='edit-template__element-selector'>
            <ElementSelector onSelect={onAddElement} />
          </div>
        )}
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
        {data.isAddSelectorBottom && (
          <div className='edit-template__element-selector'>
            <ElementSelector onSelect={onAddElement} />
          </div>
        )}
      </div>
      {isSelected && (
        <>
          <div
            className='edit-template__action-element remove-element'
            role='presentation'
            onClick={() => onRemove(data)}>
            <MdOutlineClose />
          </div>
          {!data.isAddSelectorTop && (
            <div
              className='edit-template__action-element add-prev-element'
              role='presentation'
              onClick={(event) => {
                event.stopPropagation();
                onChangeSelectorState({ ...data, isAddSelectorTop: true });
              }}>
              <MdAdd />
            </div>
          )}
          {!data.isAddSelectorBottom && (
            <div
              className='edit-template__action-element add-next-element'
              role='presentation'
              onClick={(event) => {
                event.stopPropagation();
                onChangeSelectorState({ ...data, isAddSelectorBottom: true });
              }}>
              <MdAdd />
            </div>
          )}
        </>
      )}
    </Tooltip>
  );
};
