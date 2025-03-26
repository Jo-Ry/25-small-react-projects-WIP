import { CSSProperties, ReactNode } from 'react';

type ComponentWrapperType = {
    view: 'viewport' | 'fill' | '';
    title?: string
    titleClassname?: string
    style?: CSSProperties,
    className?: string,
    children: ReactNode;
};

const ComponentWrapper = ({ view, title, titleClassname, style, className, children }: ComponentWrapperType) => {
    return (
        <section style={style}>
            {title && <h2 className={`title ${titleClassname}`}> {title}</h2>}
            <div className= {`${view === '' ? '' : 'base '}${view}${className ? ' ' + className : ''}`}>
            {children}
            </div>
        </section>
    );
};

export default ComponentWrapper;
