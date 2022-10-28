import { Logout } from '@mui/icons-material';
import { Box, styled } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { BoxWrapper } from 'src/common/BoxWrapper';
import { layoutConfig, useLayoutContext } from 'src/contexts/layout-context/layout-context';
import { menu } from '../menu';

const SidebarBox = styled(Box)(({ theme }) => ({
    position: 'fixed',
    height: '100vh',
    // boxShadow: '0px 0px 10px 0px #e7e7e7',
    background: theme.palette.background.paper,
    zIndex: layoutConfig.sidebar.zIndex,
    overflow: 'hidden',
    transition: theme.transitions.create(['width'], { duration: layoutConfig.transition, easing: 'ease' }),
})) as typeof Box;

export default function Sidebar() {
    const { sidebarWidth, logo, toggleSidebar } = useLayoutContext();
    const route = useLocation();

    return (
        <SidebarBox sx={{ width: sidebarWidth }}>
            <BoxWrapper sx={{ display: 'flex', height: layoutConfig.header.height, alignItems: 'center', justifyContent: 'center' }}>
                <img src={logo} alt="vchain logo" title="vchain logo" style={{ width: '100%', maxWidth: '200px', maxHeight: '50px' }} />
            </BoxWrapper>
            <Box sx={{ height: '1px', bgcolor: 'background.divider', margin: '0px 14px' }}></Box>
            <Box>
                {menu.map((item, index) => {
                    let checkActive = item.url === route.pathname;
                    return (
                        <Link to={item.url} key={'menusidebar' + item.title + index} style={{ textDecoration: 'none' }}>
                            <Box
                                sx={{
                                    mt: 2,
                                    transition: 'background 0.3s',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexWrap: 'nowrap',
                                    placeItems: 'center',
                                    overflow: 'hidden',
                                    color: checkActive ? 'primary.main' : 'text.secondary',
                                    '&:hover': { bgcolor: 'primary.light' },
                                    position: 'relative',
                                    '&:before': {
                                        position: 'absolute',
                                        top: '10%',
                                        left: -4,
                                        content: "''",
                                        display: checkActive ? 'block' : 'none',
                                        width: '8px',
                                        height: '80%',
                                        bgcolor: 'primary.main',
                                        borderTopRightRadius: 8,
                                        borderBottomRightRadius: 8,
                                    },
                                }}
                            >
                                <Box sx={{ minWidth: layoutConfig.sidebar.shortWidth, height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</Box>
                                <Box sx={{ display: sidebarWidth === layoutConfig.sidebar.fullWidth ? 'block' : 'none' }}>{item.title}</Box>
                            </Box>
                        </Link>
                    );
                })}
            </Box>
            <Box sx={{ cursor: 'pointer', position: 'absolute', left: 0, bottom: 0, display: 'flex', flexWrap: 'nowrap', placeItems: 'center' }} component="div" onClick={() => toggleSidebar()}>
                <Box sx={{ minWidth: layoutConfig.sidebar.shortWidth, height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Logout sx={{ transform: 'rotate(180deg)' }} />
                </Box>
                <Box sx={{ display: sidebarWidth === layoutConfig.sidebar.fullWidth ? 'block' : 'none' }}>Collapse</Box>
            </Box>
        </SidebarBox>
    );
}
