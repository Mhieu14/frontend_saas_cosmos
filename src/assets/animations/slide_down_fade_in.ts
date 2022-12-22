import { keyframes } from '@emotion/react';

export const slideDownFadeIn = keyframes({
    '0%': {
        opacity: 0,
        transform: 'scale(1,0)',
    },
    '100%': {
        opacity: 1,
        transform: 'scale(1,1)',
    },
});

export const slideDownFadeInBoth = `${slideDownFadeIn} 0.2s`;
