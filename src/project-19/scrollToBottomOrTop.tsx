import ComponentWrapper from '../components/ComponentWrapper';
import useFetch from '../project-16/useFetch';
import { useRef } from 'react';

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
 * A React component that provides functionality to scroll to the top or bottom of a list.
 */
const ScrollToBottomOrTop = () => {
    const listRef = useRef<HTMLDivElement | null>(null);

    const { data, errorMsg, isLoading } = useFetch<dummyData>(
        'https://dummyjson.com/products?limit=100&select=title',
    );

    /**
     * Scrolls the window to either the top or bottom of a referenced element smoothly.
     *
     * @param direction - Specifies the direction to scroll. Accepts either `'top'` or `'bottom'`.
     *
     * - `'top'`: Scrolls to the top of the referenced element, adjusting for a header height of 89 pixels.
     * - `'bottom'`: Scrolls to the bottom of the referenced element, ensuring it doesn't scroll past the document's height.
     *
     * The function ensures smooth scrolling behavior and prevents scrolling beyond the document's boundaries.
     *
     * @remarks
     * - If the `listRef.current` is not available, the function will exit early.
     * - Logs a warning if an invalid direction is provided.
     */
    const scrollTo = (direction: 'top' | 'bottom') => {
        if (!listRef.current) return;

        const { offsetTop: refOffsetTop, clientHeight: refHeight } = listRef.current;
        const browserScrollHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;

        const scrollToPosition = (height: number) => {
            window.scrollTo({ top: height, behavior: 'smooth' });
        };

        switch (direction) {
            case 'top':
                scrollToPosition(refOffsetTop - 89);
                break;

            case 'bottom': {
                const bottomPosition = refOffsetTop + refHeight - viewportHeight;
                const maxScrollablePosition = browserScrollHeight - viewportHeight;
                scrollToPosition(Math.min(bottomPosition, maxScrollablePosition));
                break;
            }
            default:
                console.warn('You are using a non-valid direction');
                break;
        }
    };

    return (
        <ComponentWrapper view="fill" title="Scroll to bottom or top">
            <div ref={listRef} className="scroll-to-bottom-or-top">
                <button onClick={() => scrollTo('bottom')}>Scroll to bottom</button>
                <ul>
                    {errorMsg == '' || !isLoading ? (
                        <>
                            {data && data.products.length && data.products.length > 0 ? (
                                <>
                                    {data.products.map(item => (
                                        <li key={item.id}>{item.title}</li>
                                    ))}
                                </>
                            ) : null}
                        </>
                    ) : (
                        <p>{isLoading ? 'Loading...' : errorMsg}</p>
                    )}
                </ul>
                <button onClick={() => scrollTo('top')}>Scroll back to top</button>
            </div>
        </ComponentWrapper>
    );
};

export default ScrollToBottomOrTop;
