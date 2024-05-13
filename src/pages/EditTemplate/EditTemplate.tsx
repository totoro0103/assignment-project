import { useMemo, useState } from "react";
import { exportHandler, getTemplate } from "../../utils";
import { Element } from "./components/Element";
import { Element as IElement, ElementTypes } from "../../types";
import { ElementSettingItem } from "./components/ElementSettingItem";
import { MainLayout } from "../../components/Layout/MainLayout";
type EditTemplateProps = unknown;
const templateData = getTemplate();

export const EditTemplate: React.FC<EditTemplateProps> = () => {
  const [elements, setElements] = useState<IElement[]>(templateData.elements);

  const pageElement = elements.find(
    (e) => e.type === ElementTypes.Page
  ) as IElement;

  const pageStyles = pageElement.settings.reduce((acc, setting) => {
    return {
      ...acc,
      [setting.key]: setting.value,
    };
  }, {}) as any;

  const [elementSelected, setElementSelected] = useState<IElement>(
    pageElement as IElement
  );

  const handleSelectElement = (val: IElement) => {
    setElementSelected(val);
  };

  const handleExportHtmlFile = () => {
    exportHandler({ name: templateData.name, elements });
  };

  const handleChangeSetting = (id: string, key: any, value: any) => {
    setElements((oldData) => {
      const newData = oldData.map((element) => {
        if (element.id === id) {
          const settings = element.settings.map((setting) => {
            if (setting.key === key) {
              return {
                ...setting,
                value,
              };
            }
            return setting;
          });

          return {
            ...element,
            settings,
          };
        }
        return element;
      });
      return newData;
    });
  };

  const pageSettingsComponent = useMemo(() => {
    const settings = elements.find(
      (element) => element.id === elementSelected.id
    );

    return (
      <div className='edit-template__page-settings-container'>
        <h3>{elementSelected.label}</h3>
        <div className='edit-template__page-settings customized-scrollbar'>
          {settings?.settings.map((setting) => {
            return (
              <ElementSettingItem
                key={setting.key}
                data={setting}
                onChange={(val) => {
                  console.log(val);
                  handleChangeSetting(elementSelected.id, setting.key, val);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }, [elementSelected, elements, handleChangeSetting]);

  const listElementComponent = useMemo(
    () => (
      <div className='edit-template__content customized-scrollbar'>
        <div
          className='edit-template__page'
          style={{ background: pageStyles.backgroundColor }}
          onClick={() => {
            handleSelectElement(pageElement as IElement);
          }}>
          <div
            className='edit-template__list-element'
            style={{
              ...pageStyles,
            }}>
            {elements
              .filter((element) => element.type !== ElementTypes.Page)
              .map((element) => {
                return (
                  <Element
                    isSelected={elementSelected.id === element.id}
                    key={element.id}
                    data={element}
                    onSelect={handleSelectElement}
                  />
                );
              })}
          </div>
        </div>
      </div>
    ),
    [elements, pageElement, pageStyles, handleSelectElement]
  );

  return (
    <MainLayout
      headerRightButton={
        <button
          className='main-layout__header-button'
          onClick={handleExportHtmlFile}>
          Export
        </button>
      }>
      {listElementComponent}
      {pageSettingsComponent}
    </MainLayout>
  );
};
