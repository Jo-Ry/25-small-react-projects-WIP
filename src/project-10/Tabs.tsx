import { useEffect, useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';
import { useLocation } from 'react-router-dom';

const tabsData = [
    {
        id: 1,
        title: 'Overview',
        content:
            "1 Winnie the Pooh is a beloved fictional bear created by A.A. Milne. He first appeared in 'Winnie-the-Pooh' (1926) and later in 'The House at Pooh Corner' (1928).",
    },
    {
        id: 2,
        title: 'Characters',
        content:
            "2 Pooh's friends include Piglet, Tigger, Eeyore, Rabbit, Owl, Kanga, Roo, and Christopher Robin. Each character has unique traits that make them memorable.",
    },
    {
        id: 3,
        title: 'Quotes',
        content: "3 'Sometimes the smallest things take up the most room in your heart.' - Winnie the Pooh",
    },
    {
        id: 4,
        title: 'Fun Facts',
        content:
            "4 The character was inspired by a real bear named Winnipeg, who lived in the London Zoo. Pooh's favorite food is honey.",
    },
    {
        id: 5,
        title: 'Media',
        content:
            ' 5 Winnie the Pooh has appeared in books, animated films, TV series, and merchandise. Disney acquired the rights in the 1960s.',
    },
];

const Tabs = () => {
    const { hash } = useLocation();
    const hashNumber = parseInt(hash.split('#')[1]);
    const [hashValue, setHashValue] = useState(1);

    useEffect(() => {
        setHashValue(hashNumber);
    }, [hashNumber]);

    const TabButtons = () => {
        const handleTabClick = () => {
            setHashValue(hashValue || 1);
        };

        return (
            <div className="tabs__nav">
                {tabsData.map(tab => (
                    <a
                        href={`#${tab.id}`}
                        key={tab.id}
                        onClick={() => handleTabClick()}
                        className={`tabs__nav-item ${hashValue === tab.id ? 'active' : ''}`}
                    >
                        {tab.title}
                    </a>
                ))}
            </div>
        );
    };

    const TabsContent = () => {
        return (
            <div className="tabs__content">
                {tabsData.map(tab => (
                    <div key={tab.id} className={`tabs__content ${hashValue === tab.id ? '' : 'visually-hidden'}`}>
                        {tab.content}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <ComponentWrapper view="viewport" title="Dynamic tab content">
            <div className="tabs">
                <TabButtons />
                <TabsContent />
            </div>
        </ComponentWrapper>
    );
};

export default Tabs;
