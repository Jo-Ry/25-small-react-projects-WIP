import ComponentWrapper from '../components/ComponentWrapper';
import useFetch from '../project-16/useFetch';
import { useRef, useState } from 'react';

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
const ScrollToParticularPosition = () => {
    const particularRef = useRef<HTMLLIElement | null>(null);
    
    const targetLineNumber = 50; // Specify which line you want to scroll to
    const [lineNumber, setLineNumber] = useState(targetLineNumber);

    const { data, errorMsg, isLoading } = useFetch<dummyData>(
        'https://dummyjson.com/products?limit=100&select=title',
    );

    /**
     * Scrolls the window to the position of a specific element referenced by `particularRef`.
     * If the reference is not available, the function exits early.
     *
     * The function calculates the vertical position of the element relative to the viewport
     * using `getBoundingClientRect().top` and scrolls the window to that position smoothly.
     */
    const scrollTo = () => {
        setLineNumber(targetLineNumber); // Update the state

        const targetElement = document.getElementById(targetLineNumber.toString());
        if (targetElement) {
            // window.scrollY is used to adjust for the placement in the hierarchy
            const height = targetElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: height, behavior: 'smooth' });
        }
    };

    return (
        <ComponentWrapper view="fill" title="Scroll to a particular section">
            <div className="scroll-to-particular-position">
                <button onClick={() => scrollTo()}>Scroll to line {lineNumber}</button>
                <ul>
                    {errorMsg == '' || !isLoading ? (
                        <>
                            {data && data.products.length && data.products.length > 0 ? (
                                <>
                                    {data.products.map(item => (
                                        <li
                                            id={item.id.toString()}
                                            key={item.id}
                                            style={{
                                                color: item.id === lineNumber ? 'green' : '',
                                                fontWeight: item.id === lineNumber ? '700' : '',
                                            }}
                                            ref={item.id === lineNumber ? particularRef : null} // add ref only for that specific line
                                        >
                                            {item.title}
                                        </li>
                                    ))}
                                </>
                            ) : null}
                        </>
                    ) : (
                        <p>{isLoading ? 'Loading...' : errorMsg}</p>
                    )}
                </ul>
            </div>
        </ComponentWrapper>
    );
};

export default ScrollToParticularPosition;
