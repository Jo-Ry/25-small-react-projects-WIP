import { ReactNode } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';
import { useFeatureFlagsContext } from './Context';
import TicTacToe from '../project-14/TictTacToe';
import Theme from '../project-8/Theme';
import SideMenu from '../project-6/SideMenu';
import RandomColorGenerator from '../project-2/RandomColorGenerator';
import Accordion from '../project-1/Accordion';
import { dummyApiResponseKeys } from './data';

/**
 * The `FeatureFlags` component is responsible for rendering specific UI components
 * based on the state of feature flags provided by the `useFeatureFlagsContext` hook.
 * It dynamically determines which components to display by checking the feature flags
 * against a predefined list of components.
 *
 * @component
 *
 * @returns A JSX element wrapped in a `ComponentWrapper`. If the feature flags are still
 * loading, it displays a loading message. Otherwise, it conditionally renders components
 * based on the feature flags.
 *
 * @remarks
 * - The `componentsThatWillRender` array defines the mapping between feature flag keys
 *   and their corresponding components.
 * - The `checkCurrentFlags` function is used to check the value of a specific feature flag.
 *
 */
const FeatureFlags = () => {
    const { isLoading, featureFlags } = useFeatureFlagsContext();

    const componentsThatWillRender: { key: dummyApiResponseKeys; component: ReactNode }[] = [
        {
            key: 'showlightAndDarkMode',
            component: <Theme />,
        },
        {
            key: 'showTicTacToe',
            component: <TicTacToe />,
        },
        {
            key: 'showRandomColorGenerator',
            component: <RandomColorGenerator />,
        },
        {
            key: 'showAccordion',
            component: <Accordion />,
        },
        {
            key: 'showTreeView',
            component: <SideMenu />,
        },
    ];

    /**
     * Checks the current value of a specific feature flag.
     *
     * @param getCurrentKey - The key of the feature flag to check. It must be a valid key of the `featureFlags` object.
     * @returns The boolean from the dummyApiResponse/featureFlags in this case, else it is undeefind.
     */
    const checkCurrentFlags = (getCurrentKey: dummyApiResponseKeys) => {
        if (!featureFlags) return;
        return featureFlags[getCurrentKey];
    };

    return (
        // This component will not be visible if there are no components to render !!
        <ComponentWrapper view="">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {componentsThatWillRender.map(componentItem =>
                        checkCurrentFlags(componentItem.key) ? (
                            <div key={componentItem.key}>{componentItem.component}</div>
                        ) : null,
                    )}
                </>
            )}
        </ComponentWrapper>
    );
};

export default FeatureFlags;
