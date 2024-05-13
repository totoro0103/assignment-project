import { useMemo, useState } from "react";
import { exportHandler, getTemplate } from "../../utils";
import { Element } from "./components/Element";
import { Element as IElement, ElementTypes, Template } from "../../types";
import { ElementSettingItem } from "./components/ElementSettingItem";
import { MainLayout } from "../../components/Layout/MainLayout";
import { useParams } from "react-router-dom";
type EditTemplateProps = unknown;
const templates = getTemplate();

export const EditTemplate: React.FC<EditTemplateProps> = () => {
  const params = useParams();
  const id = params.id as string;

  const templateData = templates.find(
    (template) => template.id === id
  ) as Template;

  if (!templateData?.elements) {
    return (
      <MainLayout
        headerRightButton={
          <button
            disabled={!id}
            className='edit-template__header-btn'
            onClick={() => {}}>
            Export
          </button>
        }>
        <h1>Template not found</h1>
      </MainLayout>
    );
  }

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
      <div className='sidebar customized-scrollbar'>
        <h3 className='edit-template__page-settings-title'>
          {elementSelected.label}
        </h3>
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
      <div className='content'>
        <div
          className='edit-template__page customized-scrollbar'
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
          disabled={!id}
          className='edit-template__header-btn'
          onClick={handleExportHtmlFile}>
          Export
        </button>
      }>
      {listElementComponent}
      {pageSettingsComponent}
    </MainLayout>
  );
};
