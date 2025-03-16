import { useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';
import { winnieThePoohStories, winnieThePoohStoriesType } from './data';

/**
 * This component renders an accordion based on the <details> HTML element.
 * The accordion displays a list of Winnie the Pooh stories, where only one story can be expanded at a time or several at a time.
 *
 * The key challenge in implementing this accordion was handling the toggling of the <details> element.
 * The toggleDetail function checks if multiple details can be open at the same time.
 * If not, it ensures that only one detail is open at a time by updating the state accordingly.
 *
 * The crucial point is to work with the value that comes from the toggle event and use it inside the if statement in toggleDetail.
 * This prevents the function from running when a tab is closed, ensuring the correct behavior of the accordion and not an infinite rerender.
 */

const AccordionWithDetailElements = () => {
    const [content, setContent] = useState<winnieThePoohStoriesType[]>(winnieThePoohStories);
    const [allowMultiple, setAllowMultiple] = useState(false);

    const toggleDetail = (story: winnieThePoohStoriesType, isOpen: boolean) => {
        // Check if button "allow multiple details" or off and also check if a detail is open
        // using the event.target from the onToggle() on the component
        if (allowMultiple === false && isOpen) {
            setContent(
                content.map(content =>
                    content.id === story.id ? { ...content, open: true } : { ...content, open: undefined },
                ),
            );
        }
    };

    return (
        
            <div className="multi-selection">
                <div className={`button-wrapper ${allowMultiple === true ? 'active' : ''}`}>
                    <button
                        onClick={() => {
                            setAllowMultiple(!allowMultiple);
                        }}
                    >
                        {allowMultiple === false ? 'Enable multiselection' : 'Disable multiselection'}
                    </button>
                </div>
                <div className="accordion">
                    <p><code>{`Based on <details></details> element`}</code></p>
                    {content.map(story => (
                        <details
                            key={story.id}
                            open={story.open}
                            className="accordion-wrapper"
                            onToggle={e => {
                                const isOpen = (e.target as HTMLDetailsElement).open;
                                toggleDetail(story, isOpen);
                            }}
                        >
                            <summary className="summary">{story.summary}</summary>
                            <p className="content">{story.content}</p>
                        </details>
                    ))}
                </div>
            </div>
        
    );
};

export default AccordionWithDetailElements;
