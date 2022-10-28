import { CssBaseline, responsiveFontSizes, Theme, ThemeProvider, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { BaseContextProps } from '../../global.config';
import { getThemeConfig, getThemedComponent, THEME_MODE } from '../../themes/theme';

export interface ThemeContextProps {
    toggleThemeMode: () => void;
    mode?: THEME_MODE;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export function ThemeCustomProvider({ children }: BaseContextProps) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
    const [mode, setMode] = useState<THEME_MODE>((): THEME_MODE => {
        let initialMode = localStorage.getItem('theme') as THEME_MODE;
        if (!initialMode) {
            initialMode = prefersDarkMode ? 'dark' : 'light';
            localStorage.setItem('theme', initialMode);
        }
        return initialMode;
    });

    const toggleThemeMode = useCallback(() => {
        setMode((prevMode: THEME_MODE) => {
            const newMode: THEME_MODE = prevMode === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newMode);
            return newMode;
        });
    }, []);

    const theme = useMemo<Theme>(() => {
        const _t = createTheme(getThemeConfig(mode));
        return responsiveFontSizes(deepmerge(_t, getThemedComponent(_t)));
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ toggleThemeMode, mode }}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => useContext(ThemeContext);
