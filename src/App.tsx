import './App.scss';
import Accordion from './project-1/Accordion';
import RandomColorGenerator from './project-2/RandomColorGenerator';
import StarRating from './project-3/StarRating';
import ImageSlider from './project-4/ImageSlider';
import LoadMoreData from './project-5/LoadMoreData';
import SideMenu from './project-6/SideMenu';
import QrCodeGenerator from './project-7/QrCodeGenerator';
import Theme from './project-8/Theme';
import CustomScrollbar from './project-9/CustomScrollbar';

function App() {
    return (
        <>
            <CustomScrollbar/>
            <Theme/>
            <QrCodeGenerator/>
            <SideMenu/>
            <LoadMoreData/>
            <ImageSlider />
            <StarRating />
            <RandomColorGenerator />
            <Accordion />
        </>
    );
}

export default App;
