import { ThemeContextType } from './ThemeContext';
import ComponentWrapper from '../components/ComponentWrapper';
import { useTheme } from './useTheme';
import { ThemeProvider } from './ThemeProvider';

const Theme = () => {
    return (
        <ThemeProvider>
            <DisplayTheme />
        </ThemeProvider>
    );
};

export default Theme;

const DisplayTheme = () => {
    const { theme, toggleTheme } = useTheme() as ThemeContextType;

    return (
        <ComponentWrapper view="viewport" className={theme}>
            <div className="theme">
                <h2>Set theme</h2>
                <h3>Choose between light and dark mode, default is light mode</h3>
                <div className="display-theme">
                    <span>current mode is:</span>
                    <p> {theme} </p>
                </div>
                <button onClick={toggleTheme}>change</button>
            </div>
        </ComponentWrapper>
    );
};
