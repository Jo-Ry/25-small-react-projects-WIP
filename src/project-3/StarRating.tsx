import { useEffect, useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';

type starType = number;

const StarRating = () => {
    return (
        <ComponentWrapper view="viewport" title="Star rating's">
            <div className="star-rating-wrapper">
                <div>
                    <code>Version 1</code>
                    <StarRatingVersion1 amountOfStars={10} />
                </div>
                <div>
                    <code>Version 2</code>
                    <StarRatingVersion2 amountOfStars={10} />
                </div>
            </div>
        </ComponentWrapper>
    );
};

export default StarRating;

const StarRatingVersion1 = ({ amountOfStars }: { amountOfStars: number }) => {
    const [stars, setstars] = useState<starType[]>([]);
    const [activeStars, setActiveStars] = useState<starType[]>([]);

    // populate the empty array with apprpriate amount of stars
    useEffect(() => {
        const starsIDs = [];

        for (let i = 1; i <= amountOfStars; i++) {
            starsIDs.push(i);
        }

        setstars(starsIDs);
    }, [amountOfStars]); // amountOfStars is here cause if the varable are updated, rerun the useEffect

    const highlihtRespectiveStars = (star: starType) => {
        // identify the pressed star
        const currentStar = stars.find(el => el === star);

        // extract all stars from the first star to the pressed star!
        const adjecentStars = currentStar !== undefined && stars.slice(0, stars.indexOf(currentStar) + 1);

        // update the state with the respective stars
        if (adjecentStars !== false) {
            setActiveStars(adjecentStars);
        }
    };

    return (
        <div className="star-rating">
            {stars.map(star => (
                <div
                    key={star}
                    onClick={() => highlihtRespectiveStars(star)}
                    className={`star ${activeStars.includes(star) ? 'active' : ''}`}
                ></div>
            ))}
        </div>
    );
};

const StarRatingVersion2 = ({ amountOfStars }: { amountOfStars: number }) => {
    const [starRating, setStarRating] = useState<starType>(0);
    const [starHover, setStarHover] = useState<starType>(0);

    const arrayOfIndexes = [...Array(amountOfStars)].map((_, index) => index + 1);

    const handleOnClick = (index: starType) => {
        setStarRating(index);
    };

    const handleOnMouseEnter = (index: starType) => {
        setStarHover(index);
    };

    const handleOnMouseLeave = () => {
        setStarHover(starRating);
    };

    return (
        <div className="star-rating">
            {arrayOfIndexes.map(index => (
                <div
                    key={index}
                    onClick={() => handleOnClick(index)}
                    onMouseMove={() => handleOnMouseEnter(index)}
                    onMouseLeave={() => handleOnMouseLeave()}
                    className={`star ${index <= (starRating || starHover) ? 'active' : 'inactive'}`}
                ></div>
            ))}
        </div>
    );
};
