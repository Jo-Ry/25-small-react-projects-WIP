import { useRef } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';

const Modal = () => {
    const modalRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
        if (!modalRef.current) return;

        if (!modalRef.current.hasAttribute('open')) {
            modalRef.current.showModal();
        }
    };

    return (
        <ComponentWrapper view="viewport" title="open and close modal">
            <button onClick={() => openModal()}>open dialog</button>
            <dialog className='modal' ref={modalRef}>
                <h2>Modal</h2>
                <p>Modal content</p>
                <button onClick={() => modalRef.current?.close()}>close dialog</button>
            </dialog>
        </ComponentWrapper>
    );
};

export default Modal;
