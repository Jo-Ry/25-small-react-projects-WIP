import { useRef, useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';
import useOnClickOutsideComponent from '../project-17/useOnClickOutsideComponent';

const Modal = () => {
    return (
        <ComponentWrapper view="viewport" className='modal' title="open and close modal">
            <ModalUsingDialog />
            <ModalUsingDiv />
        </ComponentWrapper>
    );
};

export default Modal;

/**
 * This component demonstrates that the <dialog> element is a valid
 * and accessible way to implement a modal in React.
 */
const ModalUsingDialog = () => {
    const modalRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
        if (!modalRef.current) return;

        if (!modalRef.current.hasAttribute('open')) {
            modalRef.current.showModal();
        }
    };

    const closeModal = () => {
        modalRef.current?.close();
    };

    return (
        <>
            <button onClick={() => openModal()}>open dialog</button>

            <dialog ref={modalRef}>
                <h2>Modal</h2>
                <p>Modal content</p>
                <button onClick={() => closeModal()}>close dialog</button>
            </dialog>
        </>
    );
};

/**
 * This component's primary purpose is not to display a visually appealing modal,
 * but to demonstrate the functionality of the useOnClickOutsideComponent hook.
 */
const ModalUsingDiv = () => {
    const [showContent, setShowContent] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // use the custom hook
    useOnClickOutsideComponent(modalRef, () => setShowContent(false));

    const openModal = () => {
        setShowContent(true);
    };

    const closeModal = () => {
        setShowContent(false);
    };

    return (
        <>
            <div ref={modalRef}>
                <button onClick={() => openModal()}>open div</button>
                <div className={`${showContent ? '' : ' hide'}`}>
                    <div className='modal__container'>
                        <h2>Modal</h2>
                        <p>Press outside of this modal</p>
                        <button onClick={() => closeModal()}>close div</button>
                    </div>
                </div>
            </div>
        </>
    );
};
