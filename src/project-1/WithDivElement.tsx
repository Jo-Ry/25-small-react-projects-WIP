import { useEffect, useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';
import { winnieThePoohStories, winnieThePoohStoriesType } from './data';

/**
 * AccordionWithDivElements is a React functional component that renders an accordion interface
 * with the ability to toggle between single and multiple selection modes.
 *
 * @typedef {Object} winnieThePoohStoriesType
 * @property {number} id - The unique identifier for the story.
 * @property {string} summary - The summary of the story.
 * @property {string} content - The content of the story.
 *
 * @state {boolean} allowMultiple - State to determine if multiple selection is allowed.
 * @state {winnieThePoohStoriesType | undefined} selectedItem - State to store the currently selected item in single selection mode.
 * @state {number[]} selectedItems - State to store the currently selected items in multiple selection mode.
 * @state {winnieThePoohStoriesType[]} data - State to store the list of stories.
 *
 * @param {winnieThePoohStoriesType} element - The story element to be selected in single selection mode.
 * @function
 * @name selectSingleAccordion
 * @description Selects a single accordion item.
 *
 * @param {number} id - The id of the story to be selected in multiple selection mode.
 * @function
 * @name selectMultipleAccordions
 * @description Selects or deselects multiple accordion items.
 */
const AccordionWithDivElements = () => {
    const [allowMultiple, setAllowMultiple] = useState(false);
    const [selectedItem, setSelectedItem] = useState<winnieThePoohStoriesType>();
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [data, setData] = useState<winnieThePoohStoriesType[]>([]);

    useEffect(() => {
        setData(winnieThePoohStories);
    }, []);

    const selectSingleAccordion = (element: winnieThePoohStoriesType) => {
        // check if the element exists in the data array
        if (!data.some(el => el.id === element.id)) {
            return;
        }

        // set the current selected object to the state
        setSelectedItem(element);
    };

    const selectMultipleAccordions = (id: number) => {
        // copy the data array as we gonna mutate it
        const copySelectedItems = [...selectedItems];

        // Check if the id exists inside the array
        if (!copySelectedItems.find(id_el => id_el === id)) {
            // if opened -> populate the index/id to the copied array
            copySelectedItems.push(id);
        } else {
            // if closed -> remove the index/id from the copied array,
            const index = copySelectedItems.indexOf(id);
            if (index > -1) {
                copySelectedItems.splice(index, 1);
            }
        }

        // update state
        setSelectedItems(copySelectedItems);
    };

    return (
        <div className="multi-selection">
            <div className={`button-wrapper ${allowMultiple === true ? 'active' : ''}`}>
                <button
                    onClick={() => {
                        setAllowMultiple(!allowMultiple);

                        // reset
                        setSelectedItems([]);
                        setSelectedItem({} as winnieThePoohStoriesType);
                    }}
                >
                    {allowMultiple === false ? 'Enable multiselection' : 'Disable multiselection'}
                </button>
            </div>
            <div className="accordion">
                <p>
                    <code>{`Based on <div></div> element`}</code>
                </p>
                {winnieThePoohStories && winnieThePoohStories.length !== 0 ? (
                    winnieThePoohStories.map(story => (
                        <div key={story.id} className="accordion-wrapper">
                            <div
                                className="summary"
                                onClick={
                                    allowMultiple
                                        ? () => selectMultipleAccordions(story.id)
                                        : () => selectSingleAccordion(story)
                                }
                            >
                                {story.summary}
                            </div>
                            <div
                                className={`content-wrapper ${
                                    selectedItems.includes(story.id) || selectedItem?.id === story.id
                                        ? 'pressed'
                                        : ''
                                }`}
                            >
                                <div>
                                    {(allowMultiple && selectedItems.includes(story.id)) ||
                                    selectedItem?.id === story.id
                                        ? story.content
                                        : null}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>no items </div>
                )}
            </div>
        </div>
    );
};

export default AccordionWithDivElements;
