import { useEffect } from 'react';

/**
 * A custom React hook that triggers a handler function when a click occurs outside of the specified element.
 *
 * @template T - A React ref object pointing to the target element.
 * @param ref - A React ref object that references the element to detect outside clicks for.
 * @param handler - A callback function to be executed when a click outside the referenced element is detected.
 *
 * @remarks
 * - The `handler` function is called with the `MouseEvent` as its argument.
 * - The hook uses the `mousedown` event to detect clicks outside the element.
 */
const UseOnClickOutsideComponent = <T extends React.RefObject<unknown>>(
    ref: T,
    handler: (event: Event) => void,
) => {
    useEffect(() => {
        
        /**
         * Handles click events outside of a specified element.
         *
         * @param event - The mouse event triggered by a click.
         *
         * The function checks if the clicked target is outside the element referenced by `ref`.
         * If the target is outside, it invokes the provided `handler` function.
         * If the target is inside the element or the element does not exist, the function returns early.
         */
        const handleClickOutside = (event: MouseEvent) => {
            const element = (ref as T).current as HTMLElement;
            if (!element || element.contains(event.target as Node)) {
                console.log('in');
                return;
            }

            handler(event);
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handler, ref]);
};

export default UseOnClickOutsideComponent;
