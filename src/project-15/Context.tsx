import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import featureFlagsDataServiceCall, { dummyApiResponseType } from './data';

type FeatureFlagsContextType = {
    isLoading: boolean;
    featureFlags: dummyApiResponseType | undefined;
};

// eslint-disable-next-line react-refresh/only-export-components
export const FeatureFlagsContext = createContext<FeatureFlagsContextType>({
    isLoading: false,
    featureFlags: undefined,
});

const FeatureFlagsProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [featureFlags, setFeatureFlags] = useState<dummyApiResponseType>();

    useEffect(() => {
        const fetchFeatureFlags = async () => {
            try {
                const response = await featureFlagsDataServiceCall() as dummyApiResponseType;
                if (response) setFeatureFlags(response);
                
            } catch (error) {
                console.error('There is a problem fetching the feature flags, following error is: ' + error);
            } finally {
                setIsloading(false);
            }
        };

        fetchFeatureFlags();
    }, []);

    return (
        <FeatureFlagsContext.Provider value={{ isLoading, featureFlags }}>
            {children}
        </FeatureFlagsContext.Provider>
    );
};

export default FeatureFlagsProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useFeatureFlagsContext = () => {
    const context = useContext(FeatureFlagsContext);
    if (!context) {
        throw new Error('useFeatureFlagsContext must be used within a FeatureFlagsProvider');
    }
    return context;
};


