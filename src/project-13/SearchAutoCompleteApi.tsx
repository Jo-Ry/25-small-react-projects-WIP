import { useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';
import { useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

type usersType =
    | {
          id: number;
          name: string;
      }[]
    | null;

/**
 * Obs type run the express api server using 'npm run dev' inside /expess/index.js
 *
 * The component fetches data from an express api server and displays the results in a dropdown
 * while trying to stay true to accessibility standards.
 *
 */
const SearchAutoCompleteApi = () => {
    const [search, setSearch] = useState<string>('');
    const [data, setData] = useState<usersType>(null);
    console.log('🚀 ~ SearchAutoCompleteApi ~ data:', data);

    // debouncing the search term to avoid making api calls on every key stroke
    const debouncedSearchTerm = useDebounce({ value: search, delay: 300 });

    const handleSearchProfiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            // stops the api call if the search term is empty but also empties the current search results
            if (debouncedSearchTerm === '') {
                setData(null);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/users?q=${debouncedSearchTerm}&limit=10`);
                const data = (await response.json()) as usersType;
                if (data) {
                    setData(data);
                }
            } catch (error) {
                console.error('🚀 ~ SearchAutoCompleteApi ~ error:', error);
            }
        };

        fetchData();
    }, [debouncedSearchTerm, search]);

    return (
        <ComponentWrapper
            view=""
            className="viewport search-auto-complete"
            title="search auto complete with express"
            style={{ backgroundColor: 'beige' }}
        >
            <div className="search-auto-complete__container">
                <input type="text" onChange={e => handleSearchProfiles(e)} />
                <div
                    id="dropdown-id"
                    className={`search-auto-complete__filtered-data${
                        data && data.length ? ' active animate-in' : ' not-opened'
                    }`}
                    aria-expanded={!!(data && data.length)}
                    aria-autocomplete="list"
                    aria-controls="dropdown-id"
                    role="listbox"
                    aria-haspopup="listbox"
                >
                    {data && data.length ? (
                        <>
                            {data.map(user => (
                                <p key={user.id} role="option" tabIndex={0}>
                                    {user.name}
                                </p>
                            ))}
                        </>
                    ) : null}
                </div>
            </div>
        </ComponentWrapper>
    );
};

export default SearchAutoCompleteApi;
