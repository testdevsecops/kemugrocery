import React from "react";
import ReactModal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  modalClass:string;
  overly:string;
} 

const Modal = ({ isOpen, onRequestClose, children,modalClass,overly }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className={modalClass}
      overlayClassName={overly}
      portalClassName="modal-portal"
    >
      <>{children}</>
    </ReactModal>
  );
};

export default Modal;
