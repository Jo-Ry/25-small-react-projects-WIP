import { useLayoutEffect, useState } from 'react';

/**
 * A custom React hook that tracks and provides the current size of the browser window.
 *
 * @remarks
 * This hook uses `useLayoutEffect` to initialize the window size and sets up an event listener
 * to update the size whenever the window is resized. The event listener is cleaned up when the
 * component using this hook is unmounted to prevent memory leaks.
 *
 * @returns An object with the current `width` and `height` of the window.
 */
const useWindowResize = () => {
    const [ windowSize, setWindowSize ] = useState({
        width: 0,
        height: 0,
    })

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
    
    useLayoutEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize
};
    

export default useWindowResize;
