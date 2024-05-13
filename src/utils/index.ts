import {
  Element,
  ElementSettings,
  ElementSettingsApplyAs,
  ElementTypes,
  Template,
} from "../types";

import {
  getHeadingElementSettings,
  getPagesElementSettings,
  getImageElementSettings,
  getParagraphElementSettings,
  getSpacerElementSettings,
} from "./elementSettingsGenerator";
export const makeId = (length: number = 5): string => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export function checkURL(image_url: string) {
  return image_url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

export const getHtmlFromSettings = (data: Element) => {
  const divContainer = document.createElement("div");
  divContainer.innerHTML = data.stringHtml;
  divContainer.style.width = "100%";
  const htmlElement = divContainer.firstChild as HTMLElement | HTMLImageElement;

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

export const generateHtml = (data: Template): string => {
  const templateTitle = data.name;
  const elementsHtmlString = data.elements
    .filter((element) => element.type !== ElementTypes.Page)
    .map((element) => getHtmlFromSettings(element))
    .join("");
  const pageElementsSettings = data.elements.find(
    (element) => element.type === ElementTypes.Page
  )?.settings as ElementSettings[];

  const pageStyles = pageElementsSettings.reduce((acc, setting) => {
    return {
      ...acc,
      [setting.key]: setting.value,
    };
  }, {}) as any;

  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Space+Grotesk:wght@300&display=swap"
        rel="stylesheet" />
      <title>${templateTitle}</title>
      <style>
        h1,p {
          margin: 0;
        }
        body {
          display: flex;
          justify-content: center;
          height: 100%;
          font-family: "DM Sans";
          font-size: 14px;
          position: relative;
          margin: 0;
          background:${pageStyles.backgroundColor};
        }
      </style>
    </head>
    <body>
      <div style="margin: 0 auto;height:100%;width:100%;max-width:${pageStyles.width};">${elementsHtmlString}</div>
    </body>
  </html>
`;
  return htmlContent;
};

export const exportHandler = (data: Template) => {
  const htmlContent = generateHtml(data);
  const blob = new Blob([htmlContent], { type: "text/html" });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = "template.html"; // The name of the downloaded file
  link.click();
};

export const getTemplate = (): Template[] => {
  const elements1: Element[] = [
    {
      id: makeId(),
      label: "Page Settings",
      type: ElementTypes.Page,
      stringHtml: "<div/>",
      settings: getPagesElementSettings({}),
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
      label: "Spacer Settings",
      type: ElementTypes.Spacer,
      stringHtml: "<div/>",
      settings: getSpacerElementSettings(),
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
    {
      id: makeId(),
      label: "Spacer Settings",
      type: ElementTypes.Spacer,
      stringHtml: "<div/>",
      settings: getSpacerElementSettings({
        height: "180px",
      }),
    },
  ];

  const elements2: Element[] = [
    {
      id: makeId(),
      label: "Page Settings",
      type: ElementTypes.Page,
      stringHtml: "<div/>",
      settings: getPagesElementSettings(),
    },
    {
      id: makeId(),
      label: "Spacer Settings",
      type: ElementTypes.Spacer,
      stringHtml: "<div/>",
      settings: getSpacerElementSettings({
        height: "100px",
      }),
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
    {
      id: makeId(),
      label: "Spacer Settings",
      type: ElementTypes.Spacer,
      stringHtml: "<div/>",
      settings: getSpacerElementSettings({
        height: "180px",
      }),
    },
  ];

  const template1 = {
    id: "template-1",
    name: "Template 1",
    elements: elements1,
  };

  const template2 = {
    id: "template-2",
    name: "Template 2",
    elements: elements2,
  };

  return [template1, template2];
};
