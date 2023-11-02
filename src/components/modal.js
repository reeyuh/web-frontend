import MuiModal from "@mui/material/Modal";
import styled from "@emotion/styled";

const ModalContent = styled.div`
  max-width: ${(prop) => `${prop.maxWidth ? `${prop.maxWidth}px` : "100vw"}`};
  min-width: ${(prop) => `${prop.minWidth ? `${prop.minWidth}px` : "100vw"}`};
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 150px;
`;

export const Modal = ({
  open = false,
  closeModal = () => {},
  children,
  title,
  minWidth = 300,
  maxWidth = 300,
}) => {
  return (
    <MuiModal
      open={open}
      onClose={closeModal}
      disableAutoFocus
      className="overflow-auto d-flex justify-content-center mb-3"
    >
      <ModalContent
        className="py-3 bg-white modal-main"
        maxWidth={maxWidth}
        minWidth={minWidth}
      >
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
