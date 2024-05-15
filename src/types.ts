export enum ElementTypes {
  Image = "image",
  Text = "text",
  Paragraph = "paragraph",
  Heading = "heading",
  Page = "page",
  Spacer = "spacer",
}

export enum ElementSettingTypes {
  ColorPicker = "color-picker",
  Slider = "slider",
  Select = "select",
  RadioButtonGroups = "radio-button-groups",
  GroupButton = "group-button",
  Input = "input",
  Textarea = "textarea",
}

export enum ElementSettingsApplyAs {
  Style = "style",
  ParentStyle = "parentStyle",
  Attribute = "attribute",
  InterText = "innerText",
}

export interface ElementSettings {
  label: string;
  key: any;
  value?: any;
  type: ElementSettingTypes;
  applyAs: ElementSettingsApplyAs;
  options?: { value: string; label: string }[];
  customComponent?: (value: any) => React.ReactNode;
}

export interface Element {
  id: string;
  label: string;
  type: ElementTypes;
  stringHtml: string;
  defaultStyles?: { key: any; value: any }[];
  settings: ElementSettings[];
  isAddSelectorTop?: boolean;
  isAddSelectorBottom?: boolean;
}

export interface Template {
  id?: string;
  name?: string;
  elements: Element[];
  iframeSnapshotImg?: string;
}
