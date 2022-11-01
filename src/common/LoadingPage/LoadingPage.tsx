import { Box, BoxProps, styled } from '@mui/material';

const LoadingView = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    background: localStorage.getItem('theme') == 'dark' ? '#111' : theme.palette.background.default,
    '& .container': {
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& p': {
            position: 'absolute',
            color: localStorage.getItem('theme') == 'dark' ? '#fff' : theme.palette.text.primary,
            fontSize: '1.5em',

            bottom: '-80px',
            letterSpacing: '0.15em',
        },
        '& .ring': {
            position: 'relative',
            width: '150px',
            height: '150px',
            margin: '-30px',
            borderRadius: '50%',
            border: '4px solid transparent',
            borderTop: '4px solid #24ecff',
            animation: 'animate 1s linear infinite',

            '&::before': {
                content: "''",
                position: 'absolute',
                top: '12px',
                right: '12px',
                borderRadius: '50%',
                width: '15px',
                height: '15px',
                background: '#24ecff',
                boxShadow: '0 0 0 5px #24ecff33 , 0 0 0 10px #24ecff22, 0 0 0 20px #24ecff11, 0 0 20px #24ecff, 0 0 50px #24ecff',
            },

            '&:nth-of-type(2)': {
                animation: 'animate2 1s linear infinite',
                animationDelay: '-0.25s',
                borderTop: '4px solid transparent',
                borderLeft: '4px solid #93ff2d',
                '&::before': {
                    content: "''",
                    position: 'absolute',
                    top: 'initial',
                    bottom: '12px',
                    left: '12px',
                    borderRadius: '50%',
                    width: '15px',
                    height: '15px',
                    background: '#93ff2d',
                    boxShadow: '0 0 0 5px #93ff2d33 , 0 0 0 10px #93ff2d22, 0 0 0 20px #93ff2d11, 0 0 20px #93ff2d, 0 0 50px #93ff2d',
                },
            },
            '&:nth-of-type(3)': {
                animation: 'animate2 1s linear infinite',
                animationDelay: '-0.75s',
                position: 'absolute',
                top: '-66.66px',
                borderTop: '4px solid transparent',
                borderLeft: '4px solid #e41cf8',
                '&::before': {
                    content: "''",
                    position: 'absolute',
                    top: 'initial',
                    bottom: '12px',
                    left: '12px',
                    borderRadius: '50%',
                    width: '15px',
                    height: '15px',
                    background: '#e41cf8',
                    boxShadow: '0 0 0 5px #e41cf833 , 0 0 0 10px #e41cf822, 0 0 0 20px #e41cf811, 0 0 20px #e41cf8, 0 0 50px #e41cf8',
                },
            },
        },
    },
    '@keyframes animate': {
        '0%': {
            transform: 'rotate(0deg)',
        },
        '100%': {
            transform: 'rotate(360deg)',
        },
    },
    '@keyframes animate2': {
        '0%': {
            transform: 'rotate(360deg)',
        },
        '100%': {
            transform: 'rotate(0deg)',
        },
    },
})) as typeof Box;

export default function LoadingPage(props: BoxProps) {
    return (
        <LoadingView {...props}>
            <Box className="container">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
                <p>Loading...</p>
            </Box>
        </LoadingView>
    );
}
