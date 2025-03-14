import { useState } from 'react';
import ComponentWrapper from '../components/ComponentWrapper';

const RandomColorGenerator = () => {
    const [color, setcolor] = useState('#000');
    const [colorType, setcolorType] = useState<'hex' | 'rgb'>('hex');

    /**
     * Generates a random integer between 0 (inclusive) and the specified length (exclusive).
     */
    const rand = (length: number) => {
        return Math.floor(Math.random() * length);
    };

    /**
     * Generates a random RGB color string and sets it to the state.
     * The color is in the format `rgb(r, g, b)` where `r`, `g`, and `b`
     * are random integers between 0 and 255.
     */
    const generateRandomRGBColor = () => {
        setcolor(`rgb( ${rand(255)}, ${rand(255)}, ${rand(255)} )`);
    };

    /**
     * Generates a random HEX color code and sets it to the state.
     *
     * The function creates a HEX color code by randomly selecting characters
     * from a predefined array of hexadecimal characters. It loops six times
     * to generate a six-character HEX code, then sets the state with the
     * generated color code prefixed with '#'.
     */
    const generateRandomHEXColor = () => {
        let hex: string = '';

        const hexCHarArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        // loop truogh 6 times when adding a character to the he string
        for (let i = 0; i < 6; i++) {
            const char = hexCHarArray[rand(i)];
            hex += char;
        }

        setcolor('#' + hex);
    };

    return (
        <ComponentWrapper
            view="viewport"
            style={{
                backgroundColor: color,
            }}
        >
            <div className="random-color">
                <div className="random-color__buttons">
                    <button
                        onClick={() => {
                            if (colorType !== 'rgb') {
                                setcolor(hexToRgb(color));
                            }
                            setcolorType('rgb');
                        }}
                    >
                        use RGB
                    </button>
                    <button
                        onClick={() => {
                            if (colorType !== 'hex') {
                                setcolor(rgbToHex(color));
                            }
                            setcolorType('hex');
                        }}
                    >
                        use Hex
                    </button>
                    <button
                        onClick={() =>
                            colorType === 'hex' ? generateRandomHEXColor() : generateRandomRGBColor()
                        }
                    >
                        Generate a random color
                    </button>
                </div>
                <div className="random-color__name">
                    <p>
                        {colorType === 'hex' && 'hex:'} {color}
                    </p>
                </div>
            </div>
        </ComponentWrapper>
    );
};

export default RandomColorGenerator;

/**
 * Converts a HEX color code to an RGB color string.
 *
 * @param {string} hex - The HEX color code to convert.
 * @returns {string} The RGB color string in the format `rgb(r, g, b)`.
 */
const hexToRgb = (hex: string): string => {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse the r, g, b values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Converts an RGB color string to a HEX color code.
 *
 * @param {string} rgb - The RGB color string to convert.
 * @returns {string} The HEX color code.
 */
const rgbToHex = (rgb: string): string => {
    const result = rgb.match(/\d+/g);
    if (!result) return '#000000';

    const r = parseInt(result[0]).toString(16).padStart(2, '0');
    const g = parseInt(result[1]).toString(16).padStart(2, '0');
    const b = parseInt(result[2]).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
};
