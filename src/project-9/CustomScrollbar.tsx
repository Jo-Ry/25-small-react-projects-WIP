import { useCallback, useEffect, useRef, useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';
import useFetch from '../hooks/useFetch';

type dummyData = {
    products: products[];
    total: number;
    skip: number;
    limit: number;
} | null;

type products = {
    id: number;
    title: string;
};

/**
 * CustomScrollbar component that displays a custom scrollbar with progress tracking.
 * 
 * This component fetches data from a dummy API and displays a list of items with a custom scrollbar.
 * The progress of the scrollbar is tracked and displayed using a <progress> tag.
 */
const CustomScrollbar = () => {
    // The `useRef` hook is used to reference the whole component.
    const progressRef = useRef<HTMLDivElement>(null);

    // this state is used to store the progress of the scrollbar in percentage
    const [progress, setProgress] = useState(0);

    // fetch data
    const { data, errorMsg, isLoading } = useFetch<dummyData>(
        'https://dummyjson.com/products?limit=100&select=title',
    );

    /**
     * Handles the scroll event and calculates the scroll progress.
     * 
     * This function is memoized using `useCallback` to prevent unnecessary re-renders.
     * It checks if the `ref` is defined and then calculates the scroll progress based on the 
     * current scroll position of the document and the position and height of the referenced element.
     * 
     * The progress is calculated as a percentage and is set using the `setProgress` function.
     * 
     * @function handleScroll
     * @returns {void}
     */
    const handleScroll = useCallback(() => {
        if (!progressRef.current) return;

        const { scrollTop: docScrollTop } = document.documentElement;
        const { offsetTop: refOffsetTop, clientHeight: refHeight } = progressRef.current;

        if (docScrollTop >= refOffsetTop && docScrollTop <= refOffsetTop + refHeight - 100) {
            const howMuchScrolleed = docScrollTop - refOffsetTop;
            const height = refHeight - 100;

            const percentage = (howMuchScrolleed / height) * 100;

            setProgress(percentage);
        }
    }, [progressRef]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <ComponentWrapper view="" className="fill custom-scrollbar">
            <div ref={progressRef} className="custom-scrollbar__wrapper">
                <div className="custom-scrollbar__navbar">
                    <h1>custom scrollbar</h1>
                    <progress max={100} value={progress}></progress>
                </div>
                {errorMsg == '' || !isLoading ? (
                    <div className="custom-scrollbar__items">
                        {data && data.products.length && data.products.length > 0 ? (
                            <>
                                {data.products.map(item => (
                                    <p key={item.id} className="custom-scrollbar__item">
                                        {item.title}
                                    </p>
                                ))}
                            </>
                        ) : null}
                    </div>
                ) : (
                    <p>{isLoading ? 'Loading...' : errorMsg}</p>
                )}
            </div>
        </ComponentWrapper>
    );
};

export default CustomScrollbar;
