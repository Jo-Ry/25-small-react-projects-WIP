import { CSSProperties, ReactNode } from 'react';

type ComponentWrapperType = {
    view: 'viewport' | 'fill' | '';
    title?: string
    style?: CSSProperties,
    className?: string,
    children: ReactNode;
};

const ComponentWrapper = ({ view, title, style, className, children }: ComponentWrapperType) => {
    return (
        <section style={style}>
            {title && <h2 className='title'>{title}</h2>}
            <div className= {`${view === '' ? '' : 'base '}${view}${className ? ' ' + className : ''}`}>
            {children}
            </div>
        </section>
    );
};

export default ComponentWrapper;
