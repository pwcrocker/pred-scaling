import { createPortal } from 'react-dom';

export default function Modal({
  modalContent: ModalContent,
  onClose,
  onNext,
  ...props
}) {
  return createPortal(
    <div {...props}>
      <ModalContent handleModalClose={onClose} handleNextAction={onNext} />
    </div>,
    document.getElementById('modal'),
  );
}
