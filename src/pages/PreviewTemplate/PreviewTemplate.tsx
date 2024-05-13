import { MainLayout } from "../../components/Layout/MainLayout";
import { generateHtml, getTemplate } from "../../utils";

type PreviewTemplateProps = unknown;
const templateData = getTemplate();

export const PreviewTemplate: React.FC<PreviewTemplateProps> = () => {
  console.log("PreviewTemplate");
  const htmlContent = generateHtml(templateData);
  return (
    <MainLayout>
      
      <iframe
        srcDoc={htmlContent}
        title='Preview'
        style={{
          width: "300px",
          height: "400px",
          overflow: "hidden",
        }}></iframe>
    </MainLayout>
  );
};
