import './App.scss';
import Accordion from './project-1/Accordion';
import RandomColorGenerator from './project-2/RandomColorGenerator';
import StarRating from './project-3/StarRating';
import ImageSlider from './project-4/ImageSlider';

function App() {
    return (
        <>
            <ImageSlider />
            <StarRating />
            <RandomColorGenerator />
            <Accordion />
        </>
    );
}

export default App;
