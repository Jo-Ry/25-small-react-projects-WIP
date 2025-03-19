import { useState, useEffect, ReactNode } from 'react';
import { ThemeType, ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<ThemeType>(() => {
        // extract the current value from local storage to the state
        const savedTheme = localStorage.getItem('theme') as ThemeType;
        return savedTheme || 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return <ThemeContext.Provider value={{ toggleTheme, theme }}>{children}</ThemeContext.Provider>;
};


