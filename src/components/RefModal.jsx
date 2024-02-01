import { forwardRef, useRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

const RefModal = forwardRef(function RefModal(
  { className, modalContent: ModalContent, onClose, onNext },
  ref,
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });
  return createPortal(
    <dialog className={className} ref={dialog}>
      <ModalContent handleModalClose={onClose} handleNextAction={onNext} />
    </dialog>,
    document.getElementById('modal'),
  );
});

export default RefModal;
