import { CSSProperties, ReactNode } from 'react';

type ComponentWrapperType = {
    view: 'viewport' | 'fill';
    children: ReactNode;
    style?: CSSProperties
};

const ComponentWrapper = ({ view, style, children }: ComponentWrapperType) => {
    return (
        <section className= {`base ${view === 'fill' ? '' : 'viewport'}`} style={style}>
            {children}
        </section>
    );
};

export default ComponentWrapper;
