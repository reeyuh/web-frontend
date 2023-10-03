import MuiModal from "@mui/material/Modal";
import styled from "@emotion/styled";
import "@/styles/modal.scss";

const ModalContent = styled.div`
  width: ${(prop) => `${prop.width}px` || "100vw"};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
`;

export const Modal = ({
  open,
  closeModal = () => {},
  children,
  title,
  width,
}) => {
  return (
    <MuiModal open={open} onClose={closeModal} disableAutoFocus>
      <ModalContent className="py-3  bg-white" width={width}>
        <div className="modal-close" onClick={closeModal}>
          &times;
        </div>
        {title && (
          <div className="px-4 mb-3 modal-title">
            <p className="modal-title-text mb-3">{title}</p>
          </div>
        )}
        <div className="px-4">{children}</div>
      </ModalContent>
    </MuiModal>
  );
};
