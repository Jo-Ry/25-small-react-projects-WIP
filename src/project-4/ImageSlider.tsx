import { useEffect, useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';

type imageObject = {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
};

const ImageSlider = () => {
    const [images, setImages] = useState<imageObject[] | null>(null);
    const [image, setImage] = useState<imageObject | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const fetchImages = async () => {
        try {
            setIsLoading(true);
            const fetchImages = await fetch('https://picsum.photos/v2/list?limit=10');
            const images = (await fetchImages.json()) as imageObject[];

            if (images) {
                setImages(images);
                setIsLoading(false);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unkown error occured');
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    /*
        Handle if there are noimages, an error occured or if it stills loading in !!
    */

    if (images == null || images.length === 0) {
        return (
            <ComponentWrapper view="viewport" title="Image slider">
                <p>no images can be found</p>
            </ComponentWrapper>
        );
    }

    if (error !== '' || isLoading) {
        return (
            <ComponentWrapper view="viewport" title="Image slider">
                <p>{isLoading ? 'Loading...' : error}</p>
            </ComponentWrapper>
        );
    }

    const handleOnLeftClick = () => {
        if (currentImageIndex !== images.length && currentImageIndex > 0) {
            // set current image index, unless the index goes to 0 to prevent out of bound error
            setCurrentImageIndex(prev => prev - 1);
        } else {
            // go to last image in the array
            setCurrentImageIndex(images.length - 1);
        }
    };

    const handleOnRightClick = () => {
        if (currentImageIndex !== images.length - 1) {
            // set current image index unless the index exceeds the length of the image array
            setCurrentImageIndex(prev => prev + 1);
        } else {
            // reset and go back to the first image
            setCurrentImageIndex(0);
        }
    };

    console.log(images);
    console.log(currentImageIndex);

    return (
        <ComponentWrapper view="viewport" title="Image slider" style={{ backgroundColor: 'beige' }}>
            <div className="image-slider">
                <div className="image-slider-images">
                    <button
                        className="image-slider-images__left-arrow"
                        onClick={() => handleOnLeftClick()}
                    >{`<`}</button>
                    <button
                        className="image-slider-images__right-arrow"
                        onClick={() => handleOnRightClick()}
                    >{`>`}</button>

                    <img
                        src={images.find(img => img.id === currentImageIndex.toString())?.download_url}
                        alt={'image.author'}
                        className="current-image"
                        loading="lazy"
                    />

                    <div className="current-indicators">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                style={{
                                    backgroundColor: currentImageIndex === index ? 'green' : '#555',
                                }}
                                className="current-indicator"
                            ></span>
                        ))}
                    </div>
                </div>
            </div>
        </ComponentWrapper>
    );
};

export default ImageSlider;
