import { ElementSettingsApplyAs, ElementSettingTypes } from "../types";

export const getPagesElementSettings = (settings?: any) => {
  const data = {
    backgroundColor: "#ffffff",
    pageWidth: "600px",
    ...settings,
  };
  const { backgroundColor, pageWidth } = data;

  return [
    {
      label: "Background color",
      key: "backgroundColor",
      value: backgroundColor,
      applyAs: ElementSettingsApplyAs.Style,
      type: ElementSettingTypes.ColorPicker,
    },
    {
      label: "Page Width",
      key: "width",
      value: pageWidth,
      applyAs: ElementSettingsApplyAs.Style,
      type: ElementSettingTypes.Slider,
    },
  ];
};

export const getImageElementSettings = (settings?: any) => {
  const data = {
    width: "150px",
    textAlign: "center",
    src: "https://via.placeholder.com/300x300.png?text=placeholder+image",
    backgroundColor: "#ffffff",
    alt: "placeholder-image",
    ...settings,
  };

  const { width, src, alt, textAlign, backgroundColor } = data;
  return [
    {
      label: "Width",
      key: "width",
      value: width,
      type: ElementSettingTypes.Slider,
      applyAs: ElementSettingsApplyAs.Style,
    },
    {
      label: "Background color",
      key: "backgroundColor",
      value: backgroundColor,
      applyAs: ElementSettingsApplyAs.ParentStyle,
      type: ElementSettingTypes.ColorPicker,
    },
    {
      label: "Source",
      key: "src",
      value: src,
      applyAs: ElementSettingsApplyAs.Attribute,
      type: ElementSettingTypes.Input,
    },
    {
      label: "Alternate Text",
      key: "alt",
      value: alt,
      applyAs: ElementSettingsApplyAs.Attribute,
      type: ElementSettingTypes.Input,
    },
    {
      label: "Alignment",
      key: "textAlign",
      value: textAlign,
      applyAs: ElementSettingsApplyAs.ParentStyle,
      type: ElementSettingTypes.GroupButton,
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
  ];
};

export const getHeadingElementSettings = (settings?: any) => {
  const data = {
    color: "#000000",
    backgroundColor: "#ffffff",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    content: "Lorem Ipsum is simply dummy ",
    ...settings,
  };
  const { color, backgroundColor, textAlign, fontSize, fontWeight, content } =
    data;

  return [
    {
      label: "Color",
      key: "color",
      value: color,
      applyAs: ElementSettingsApplyAs.Style,
      type: ElementSettingTypes.ColorPicker,
    },
    {
      label: "Background color",
      key: "backgroundColor",
      value: backgroundColor,
      applyAs: ElementSettingsApplyAs.Style,
      type: ElementSettingTypes.ColorPicker,
    },
    {
      label: "Font Size",
      key: "fontSize",
      value: fontSize,
      applyAs: ElementSettingsApplyAs.Style,
      type: ElementSettingTypes.Slider,
    },
    {
      label: "Font Weight",
      key: "fontWeight",
      value: fontWeight,
      applyAs: ElementSettingsApplyAs.Style,
      type: ElementSettingTypes.RadioButtonGroups,
      options: [
        { label: "Light", value: "lighter" },
        { label: "Regular", value: "normal" },
        { label: "Bold", value: "bold" },
      ],
    },
    {
      label: "Alignment",
      key: "textAlign",
      value: textAlign,
      applyAs: ElementSettingsApplyAs.Style,
      type: ElementSettingTypes.GroupButton,
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    {
      label: "Content",
      key: "interText",
      applyAs: ElementSettingsApplyAs.InterText,
      value: content,
      type: ElementSettingTypes.Textarea,
    },
  ];
};

export const getParagraphElementSettings = (settings?: any) => {
  const data = {
    color: "#000000",
    backgroundColor: "#ffffff",
    fontSize: "14px",
    fontWeight: "normal",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry",
    textAlign: "left",
    ...settings,
  };
  const { color, backgroundColor, fontSize, fontWeight, content, textAlign } =
    data;

  return [
    {
      label: "Color",
      key: "color",
      value: color,
      applyAs: ElementSettingsApplyAs.Style,
      type: ElementSettingTypes.ColorPicker,
    },
    {
      label: "Background color",
      key: "backgroundColor",
      value: backgroundColor,
      applyAs: ElementSettingsApplyAs.Style,
      type: ElementSettingTypes.ColorPicker,
    },
    {
      label: "Font Size",
      key: "fontSize",
      value: fontSize,
      applyAs: ElementSettingsApplyAs.Style,
      type: ElementSettingTypes.Slider,
    },
    {
      label: "Font Weight",
      key: "fontWeight",
      value: fontWeight,
      applyAs: ElementSettingsApplyAs.Style,
      type: ElementSettingTypes.RadioButtonGroups,
      options: [
        { label: "Light", value: "lighter" },
        { label: "Regular", value: "normal" },
        { label: "Bold", value: "bold" },
      ],
    },
    {
      label: "Alignment",
      key: "textAlign",
      value: textAlign,
      applyAs: ElementSettingsApplyAs.Style,
      type: ElementSettingTypes.GroupButton,
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    {
      label: "Content",
      key: "interText",
      applyAs: ElementSettingsApplyAs.InterText,
      value: content,
      type: ElementSettingTypes.Textarea,
    },
  ];
};

export const getSpacerElementSettings = (settings?: any) => {
  const data = {
    backgroundColor: "#ffffff",
    height: "40px",
    ...settings,
  };
  const { backgroundColor, height } = data;

  return [
    {
      label: "Background Color",
      key: "backgroundColor",
      value: backgroundColor,
      applyAs: ElementSettingsApplyAs.Style,
      type: ElementSettingTypes.ColorPicker,
    },
    {
      label: "Height",
      key: "height",
      value: height,
      applyAs: ElementSettingsApplyAs.Style,
      type: ElementSettingTypes.Slider,
    },
  ];
};
