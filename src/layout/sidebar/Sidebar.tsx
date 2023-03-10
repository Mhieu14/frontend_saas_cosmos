import { Logout } from '@mui/icons-material';
import { Box, styled, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { BoxWrapper } from 'src/common/BoxWrapper';
import { layoutConfig, useLayoutContext } from 'src/contexts/layout-context/layout-context';
import { menu } from '../menu';

const SidebarBox = styled(Box)(({ theme }) => ({
    position: 'fixed',
    height: '100vh',
    boxShadow: theme.shadows[4],
    background: theme.palette.background.sidebar,
    zIndex: layoutConfig.sidebar.zIndex,
    overflow: 'hidden',
    borderRadius: '0px 10px 10px 0px',
    backdropFilter: 'blur(20px)',
    transition: theme.transitions.create(['width'], { duration: layoutConfig.transition, easing: 'ease' }),
})) as typeof Box;

export default function Sidebar() {
    const { sidebarWidth, logo, toggleSidebar } = useLayoutContext();
    const route = useLocation();
    // console.log(route);
    return (
        <SidebarBox sx={{ width: sidebarWidth }}>
            <BoxWrapper sx={{ display: 'flex', height: layoutConfig.header.height, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src={logo} alt="vchain logo" title="vchain logo" style={{ maxWidth: '200px', maxHeight: '40px' }} />
            </BoxWrapper>
            <Box sx={{ height: '1px', bgcolor: 'divider', margin: '0px 14px' }}></Box>
            <Box>
                {menu.map((item, index) => {
                    let checkActive = route.pathname.indexOf(item.url) === 0;
                    let isFullSidebar = sidebarWidth === layoutConfig.sidebar.fullWidth;
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
                                    '&:hover': { bgcolor: 'primary.light', color: 'primary.main' },
                                    position: 'relative',
                                    '&:before': {
                                        position: 'absolute',
                                        top: '0',
                                        left: -4,
                                        content: "''",
                                        display: checkActive ? 'block' : 'none',
                                        width: '8px',
                                        height: '100%',
                                        bgcolor: 'primary.main',
                                        borderTopRightRadius: 5,
                                        borderBottomRightRadius: 5,
                                    },
                                }}
                            >
                                <Tooltip title={isFullSidebar ? '' : <b>{item.title}</b>} placement="right">
                                    <Box sx={{ minWidth: layoutConfig.sidebar.shortWidth, height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</Box>
                                </Tooltip>
                                <Box sx={{ display: isFullSidebar ? 'block' : 'none', fontWeight: '600', transition: 'color 0.3s' }}>{item.title}</Box>
                            </Box>
                        </Link>
                    );
                })}
            </Box>
            <Box
                sx={{
                    cursor: 'pointer',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    display: 'flex',
                    flexWrap: 'nowrap',
                    placeItems: 'center',
                    borderTop: '1px dashed',
                    borderColor: 'divider',
                    width: '100%',
                }}
                component="div"
                onClick={() => toggleSidebar()}
            >
                <Box sx={{ minWidth: layoutConfig.sidebar.shortWidth, height: layoutConfig.sidebar.shortWidth, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Logout sx={{ transform: sidebarWidth === layoutConfig.sidebar.fullWidth ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.3s' }} />
                </Box>
                <Box sx={{ display: sidebarWidth === layoutConfig.sidebar.fullWidth ? 'block' : 'none', flexGrow: 1 }}>Collapse</Box>
            </Box>
        </SidebarBox>
    );
}
