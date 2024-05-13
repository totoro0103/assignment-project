import { useNavigate } from "react-router-dom";
import { MainLayout } from "../../components/Layout/MainLayout";
import { generateHtml, getTemplate } from "../../utils";

type PreviewTemplateProps = unknown;
const templates = getTemplate();

export const PreviewTemplate: React.FC<PreviewTemplateProps> = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className='preview-template__content'>
        <h1 className='preview-template__header-title'>
          Choose a template to start
        </h1>
        <div className='preview-template__list-container'>
          {templates.map((template) => {
            const htmlContent = generateHtml(template);
            return (
              <div className='preview-template__item' key={template.id}>
                <iframe
                  srcDoc={htmlContent}
                  scrolling='no'
                  title='Preview'></iframe>
                <div className='preview-template__item-divider' />
                <div className='preview-template__item-title'>
                  {template.name}
                </div>
                <div
                  className='preview-template__item-back-drop'
                  onClick={() => navigate("/edit/" + template.id)}>
                  <span>Edit Template</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};
