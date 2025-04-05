import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Accordion from './project-1/Accordion';
import Tabs from './project-10/Tabs';
import RandomColorGenerator from './project-2/RandomColorGenerator';
import StarRating from './project-3/StarRating';
import ImageSlider from './project-4/ImageSlider';
import LoadMoreData from './project-5/LoadMoreData';
import SideMenu from './project-6/SideMenu';
import QrCodeGenerator from './project-7/QrCodeGenerator';
import Theme from './project-8/Theme';
import CustomScrollbar from './project-9/CustomScrollbar';
import Modal from './project-11/Modal';
import GithubProfileFinder from './project-12/GithubProfileFinder';
import SearchAutoCompleteApi from './project-13/SearchAutoCompleteApi';
import TicTacToe from './project-14/TictTacToe';
import FeatureFlags from './project-15/FeatureFlags';
import FeatureFlagsProvider from './project-15/Context';
import WindowResize from './project-18';
import ScrollToBottomOrTop from './project-19/ScrollToBottomOrTop';
import ScrollToParticularPosition from './project-20/ScrollToParticularPosition';
import WeatherApp from './project-21/WeatherApp';

// Project 22
import Home from './project-22/pages/home';
import FoodRecipe from './project-22/pages/foodRecipe';
import Favorites from './project-22/pages/favorites';
import PageLayout from './project-22/layouts/PageLayout';

/* 
    Note: This router configuration is simplified for learning purposes and does not include error boundaries 
    or a 'catch-all' route for unmatched paths. For a more robust implementation, refer to my 
    'react-supabase-boilerplate' repository, where these scenarios are handled properly.
*/

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;

const Components = () => {
    return (
        <>
            <WeatherApp />
            <ScrollToBottomOrTop />
            <ScrollToParticularPosition />
            <WindowResize />
            <FeatureFlagsProvider>
            <FeatureFlags />
            </FeatureFlagsProvider>
            <TicTacToe />
            <SearchAutoCompleteApi />
            <GithubProfileFinder />
            <Modal />
            <Tabs />
            <CustomScrollbar />
            <Theme />
            <QrCodeGenerator />
            <SideMenu />
            <LoadMoreData />
            <ImageSlider />
            <StarRating />
            <RandomColorGenerator />
            <Accordion />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: '',
        element: <Components />,
    },
    {
        path: '/food-recipes',
        element: <PageLayout />,
        children: [
            {
                path: '', // show all food recipes
                element: <Home />,
            },
            {
                path: ':recipe', // show a single food recipe
                element: <FoodRecipe />,
            },
            {
                path: 'favorites', // show all favorites
                element: <Favorites />,
            },
        ],
    },
]);
