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

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;

const Components = () => {
    return (
        <>
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
]);
