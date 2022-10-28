import { useMediaQuery } from '@mui/material';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { imagePath } from 'src/constants/ImagePath';
import { BaseContextProps } from 'src/global.config';

export interface LayoutContextProps {
    sidebarWidth: string;
    toggleSidebar: () => void;
    logo: string;
    breakPointLayout: boolean;
}

export const layoutConfig = {
    sidebar: {
        fullWidth: '280px',
        shortWidth: '80px',
        zIndex: 100,
    },
    header: {
        height: '80px',
        zIndex: 99,
    },
    borderRadius: '8px',
    transition: '0.3s',
};

const LayoutContext = createContext<LayoutContextProps>({} as LayoutContextProps);

export function LayoutProvider({ children }: BaseContextProps) {
    const breakPointLayout = useMediaQuery('(max-width:1024px)');
    const [sidebarWidth, setSidebarWidth] = useState<string>(breakPointLayout ? '0px' : layoutConfig.sidebar.fullWidth);
    const logo = useMemo(() => {
        if (sidebarWidth === layoutConfig.sidebar.fullWidth) {
            return imagePath.LOGO_LONG_BLUE;
        } else {
            return imagePath.LOGO_SHORT_BLUE;
        }
    }, [sidebarWidth]);

    const toggleSidebar = useCallback(() => {
        if (sidebarWidth === layoutConfig.sidebar.fullWidth) {
            if (breakPointLayout) {
                setSidebarWidth('0px');
            } else {
                setSidebarWidth(layoutConfig.sidebar.shortWidth);
            }
        } else {
            setSidebarWidth(layoutConfig.sidebar.fullWidth);
        }
    }, [breakPointLayout, sidebarWidth]);

    return <LayoutContext.Provider value={{ sidebarWidth, logo, toggleSidebar, breakPointLayout }}>{children}</LayoutContext.Provider>;
}

export const useLayoutContext = () => useContext(LayoutContext);
