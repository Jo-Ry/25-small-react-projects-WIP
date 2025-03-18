import { useEffect, useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';

type dummyData = {
    products: products[];
    total: number;
    skip: number;
    limit: number;
} | null;

type products = {
    id: number;
    title: string;
    price: number;
};

const LoadMoreData = () => {
    // states for handling the api call
    const [data, setData] = useState<dummyData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [skip, setSkip] = useState(10);

    useEffect(() => {
        // fetch dummy data
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://dummyjson.com/products?limit=10&select=title,price`);
                const result = (await response.json()) as dummyData;

                if (result) {
                    setData(result);
                    setIsLoading(false);
                }
            } catch (error) {
                setErrorMsg(error instanceof Error ? error.message : 'An unkown error occured');
            }
        };

        fetchProducts();
    }, []);

    // Handle the pagination
    const handlePagination = async () => {
        // Return nothing if there is no data, aka the state "data" is still null!
        if (!data) return;

        // Stop the logic below from running if all items has been fetched
        if (data.total == skip) {
            return;
        }

        try {
            const response = await fetch(
                `https://dummyjson.com/products?limit=10&skip=${skip}&select=title,price`,
            );
            const result = (await response.json()) as dummyData;

            if (result) {
                setData(originalObject => {
                    if (!originalObject) return result;

                    return {
                        ...originalObject,
                        products: [...originalObject.products, ...result.products],
                    };
                });
                setSkip(prevSkip => {
                    const currentSkipAmount = result.total - prevSkip < 10 ? result.products.length : 10;
                    const nothingMoreIsFetched = prevSkip == result.total;
                    return prevSkip + (nothingMoreIsFetched ? 0 : currentSkipAmount);
                });
            }
        } catch (error) {
            setErrorMsg(error instanceof Error ? error.message : 'An unkown error occured');
        }
    };

    if (errorMsg !== '' || isLoading) {
        return (
            <ComponentWrapper view="viewport" title="Pagination">
                <p>{isLoading ? 'Loading...' : errorMsg}</p>
            </ComponentWrapper>
        );
    }

    return (
        <ComponentWrapper view="fill" title="Pagination">
            <div className="load-more-data">
                {data?.products.map(prdouct => (
                    <div key={prdouct.id} className="product">
                        <p>{prdouct.title}</p>
                        <p>{prdouct.price} $</p>
                    </div>
                ))}
            </div>
            <div className="button-wrapper">
                <button onClick={() => handlePagination()}>load more</button>
            </div>
        </ComponentWrapper>
    );
};

export default LoadMoreData;
