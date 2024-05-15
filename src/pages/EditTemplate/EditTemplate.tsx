import { useCallback, useMemo, useState } from "react";
import { exportHandler, generateHtml, getTemplate } from "../../utils";
import { Element } from "./components/Element";
import { Element as IElement, ElementTypes, Template } from "../../types";
import { ElementSettingItem } from "./components/ElementSettingItem";
import { MainLayout } from "../../components/Layout/MainLayout";
import { useParams } from "react-router-dom";
import { Modal } from "../../components/Element/Modal";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

type EditTemplateProps = unknown;
const templates = getTemplate();

export const EditTemplate: React.FC<EditTemplateProps> = () => {
  const [isOpenPreview, setIsOpenPreview] = useState(false);
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

  const handleChangeSetting = useCallback(
    (id: string, key: any, value: any) => {
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
    },
    []
  );

  const handleRemoveElement = useCallback((val: IElement) => {
    setElements((prevData) =>
      prevData.filter((element) => element.id !== val.id)
    );
  }, []);
  const handleChangeSelectorState = useCallback((val: IElement) => {
    setElementSelected(val);
    setElements((prevData) =>
      prevData.map((element) => (element.id === val.id ? val : element))
    );
  }, []);
  const handleAddElement = useCallback((val: IElement) => {}, []);

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

  const reorder = (list: IElement[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      elements.filter((element) => element.type !== ElementTypes.Page),
      result.source.index,
      result.destination.index
    );

    setElements([pageElement, ...items]);
  };
  const listElementComponent = useMemo(
    () => (
      <div className='content'>
        <div
          className='edit-template__page customized-scrollbar'
          style={{ background: pageStyles.backgroundColor }}
          onClick={() => {
            handleSelectElement(pageElement as IElement);
            setElements((prevData) =>
              prevData.map((element) => ({
                ...element,
                isAddSelectorBottom: false,
                isAddSelectorTop: false,
              }))
            );
          }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='droppable'>
              {(droppableProvided) => (
                <div
                  className='edit-template__list-element'
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                  style={{
                    ...pageStyles,
                  }}>
                  {elements
                    .filter((element) => element.type !== ElementTypes.Page)
                    .map((element, index) => {
                      return (
                        <Draggable
                          key={element.id}
                          draggableId={element.id}
                          index={index}>
                          {(draggableProvided) => {
                            return (
                              <div
                                key={element.id}
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}>
                                <Element
                                  isSelected={elementSelected.id === element.id}
                                  key={element.id}
                                  data={element}
                                  onSelect={handleSelectElement}
                                  onRemove={handleRemoveElement}
                                  onChangeSelectorState={
                                    handleChangeSelectorState
                                  }
                                  onAddElement={handleAddElement}
                                />
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    ),
    [elements, pageElement, pageStyles, handleSelectElement]
  );

  return (
    <MainLayout
      headerRightButton={
        <div>
          <button
            disabled={!id}
            className='edit-template__header-btn'
            onClick={() => setIsOpenPreview(true)}>
            Preview
          </button>
          <button
            disabled={!id}
            className='edit-template__header-btn'
            onClick={handleExportHtmlFile}>
            Export
          </button>
        </div>
      }>
      {listElementComponent}
      {pageSettingsComponent}
      {isOpenPreview && (
        <Modal
          data={generateHtml({ name: templateData.name, elements })}
          isOpen={isOpenPreview}
          onClose={() => setIsOpenPreview(false)}
        />
      )}
    </MainLayout>
  );
};
