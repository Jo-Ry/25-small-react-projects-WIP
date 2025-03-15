import { CSSProperties, ReactNode } from 'react';

type ComponentWrapperType = {
    view: 'viewport' | 'fill';
    title?: string
    style?: CSSProperties
    children: ReactNode;
};

const ComponentWrapper = ({ view, title, style, children }: ComponentWrapperType) => {
    return (
        <section style={style}>
            <h2 className='title'>{title}</h2>
            <div className= {`base ${view === 'fill' ? '' : 'viewport'}`}>
            {children}
            </div>
        </section>
    );
};

export default ComponentWrapper;
