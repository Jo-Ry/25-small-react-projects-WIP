import { useCallback, useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';
import placeholderImage from '/placeholder.jpg';
import { useEffect } from 'react';

type GithubProfileType = {
    avatar_url: string;
    html_url: string;
    login: string; // username
    public_repos: number;
    followers: number;
    following: number;
    created_at: string; // joined date
} | null;

const GithubProfileFinder = () => {
    const [search, setSearch] = useState<string>('');
    const [githubData, setGithubData] = useState<GithubProfileType>(null);

    const handleSearchGithubProfiles = useCallback(async () => {
        if (search === '') return;

        try {
            const response = await fetch(`https://api.github.com/users/${search}`);
            const data = (await response.json()) as GithubProfileType;

            if (data) {
                setGithubData(data);
            }
        } catch (error) {
            console.error('🚀 ~ GithubProfileFinder ~ error:', error);
        }
    }, [search]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleSearchGithubProfiles();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSearchGithubProfiles, search]);

    return (
        <ComponentWrapper view="viewport" title="search github profiles">
            <div className="github-profile-finder">
                <div className="github-profile-finder__header">
                    <input
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search for a github Username"
                    />
                    <button onClick={() => handleSearchGithubProfiles()}>Submit</button>
                </div>
                <div className="github-profile-finder__card">
                    <div className="github-profile-finder__card-header">
                        <img
                            src={githubData?.avatar_url || placeholderImage}
                            alt={`${githubData?.login}'s profile picture`}
                        />
                        <a href={githubData?.html_url || '#'}>{githubData?.login || ''}</a>
                        <p>{`User joined at: ${
                            githubData?.created_at ? new Date(githubData?.created_at).toDateString() : ''
                        }`}</p>
                    </div>
                    <div className="github-profile-finder__card-body">
                        <p>{`Public repos: ${githubData?.public_repos || 0}`}</p>
                        <p>{`Followers: ${githubData?.followers || 0}`}</p>
                        <p>{`Following: ${githubData?.following || 0}`}</p>
                    </div>
                </div>
            </div>
        </ComponentWrapper>
    );
};

export default GithubProfileFinder;
