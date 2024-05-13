import clsx from "clsx";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { MdOutlineTabletAndroid } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";

type ModalProps = {
  data: string;
  isOpen: boolean;
  onClose: () => void;
};

enum PreviewMode {
  Desktop = "desktop",
  Tablet = "tablet",
  Mobile = "mobile",
}
const previewModeOptions = [
  { value: PreviewMode.Desktop, icon: <MdOutlineDesktopWindows /> },
  { value: PreviewMode.Tablet, icon: <MdOutlineTabletAndroid /> },
  { value: PreviewMode.Mobile, icon: <MdOutlinePhoneAndroid /> },
];

export const Modal: React.FC<ModalProps> = ({ data, isOpen, onClose }) => {
  const [previewMode, setPreviewMode] = useState<PreviewMode>(
    PreviewMode.Desktop
  );

  const getIframeWidthSize = () => {
    switch (previewMode) {
      case PreviewMode.Desktop:
        return "100%";
      case PreviewMode.Tablet:
        return "768px";
      case PreviewMode.Mobile:
        return "375px";
      default:
        return "100%";
    }
  };

  return (
    <div id='myModal' className={clsx("modal", isOpen && "modal__open")}>
      <div className='modal__content'>
        <div className='model__header-container'>
          <div></div>
          <div className='modal__options-container'>
            {previewModeOptions.map((option) => (
              <div
                onClick={() => setPreviewMode(option.value as PreviewMode)}
                className={clsx(
                  "modal__option",
                  previewMode === option.value && "modal__option-selected"
                )}>
                {option.icon}
              </div>
            ))}
          </div>
          <div onClick={onClose} className='modal__close'>
            <MdOutlineClose />
          </div>
        </div>

        <iframe
          srcDoc={data}
          style={{
            width: getIframeWidthSize(),
            height: "80vh",
            border: "2px dashed #ccc",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
};
