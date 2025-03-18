import { useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';
import menus, { menusType } from './data';

const SideMenu = () => {
    type singleItem = menusType[number];

    /**
     * Represents a menu item component that can display its children items.
     */
    const MenuItem = ({ item }: { item: singleItem }) => {
        const [displayCurrentChildren, setDisplayCurrentChildren] = useState<{ [key: string]: boolean }>({});

        /**
         * Toggles the display state of the children for the given label.
         *
         * @param getCurrentLabel - The label of the current item whose display state is to be toggled.
         */
        const open = (getCurrentLabel: string) => {
            setDisplayCurrentChildren(prevState => ({
                ...prevState,
                [getCurrentLabel]: !prevState[getCurrentLabel],
            }));
        };

        return (
            <div className="menu-item">
                <div className="menu-item__pressable">
                    <p>{item.label}</p>
                    {item && item.children && item.children.length && (
                        <span onClick={() => open(item.label)}>
                            {displayCurrentChildren[item.label] ? '-' : '+'}
                        </span>
                    )}
                </div>
                {item && item.children && item.children.length > 0 && displayCurrentChildren[item.label] && (
                    <MenuList list={item.children} />
                )}
            </div>
        );
    };

    /**
     * Component that renders a list of menu items.
     */
    const MenuList = ({ list = [] }: { list: menusType }) => {
        return list.length > 0 ? (
            <ul>
                {list.map(listItem => (
                    <li key={listItem.label}>
                        <MenuItem item={listItem} />
                    </li>
                ))}
            </ul>
        ) : null;
    };

    return (
        <ComponentWrapper view="" className="fill">
            <aside className="side-menu">
                <MenuList list={menus} />
            </aside>
        </ComponentWrapper>
    );
};

export default SideMenu;