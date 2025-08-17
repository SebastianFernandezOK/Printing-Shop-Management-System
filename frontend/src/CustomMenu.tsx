import { MenuItemLink, useSidebarState, useResourceDefinitions } from 'react-admin';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Box, useTheme } from '@mui/material';

export const CustomMenu = () => {
    const [open] = useSidebarState();
    const resources = useResourceDefinitions();
    const theme = useTheme();
    return (
        <Box sx={{ px: 0, py: 1 }}>
            {Object.values(resources).map((resource: any, idx, arr) => (
                <>
                    <MenuItemLink
                        key={resource.name}
                        to={`/${resource.name}`}
                        primaryText={resource.options?.label || resource.name}
                        leftIcon={resource.icon ? <resource.icon sx={{ color: theme.palette.common.white, fontSize: 24, ml: 0, pl: 0, alignSelf: 'center' }} /> : undefined}
                        sidebarIsOpen={open}
                        sx={{
                            color: theme.palette.common.white,
                            borderRadius: 0,
                            mx: 1,
                            my: 0,
                            width: open ? '100%' : 56,
                            justifyContent: 'flex-start',
                            position: 'relative',
                            '&.Mui-selected, &.Mui-selected:hover': {
                                background: '#f0f4fa',
                                color: theme.palette.primary.main,
                                fontWeight: 700,
                                '& .RaMenuItemLink-icon': {
                                    color: theme.palette.primary.main,
                                },
                            },
                            '& .RaMenuItemLink-icon': {
                                minWidth: 0,
                                ml: 0,
                                mr: 0,
                                pl: 0,
                                display: 'flex',
                                justifyContent: 'flex-start',
                                width: open ? 40 : '100%',
                                transition: 'color 0.2s',
                            },
                            '& .RaMenuItemLink-label': {
                                display: open ? 'inline' : 'none',
                            },
                        }}
                    />
                    {open && resource.name !== 'remitos' && (
                        <Box sx={{ height: 2, mx: 2, my: 0.5, borderRadius: 1, background: 'linear-gradient(90deg, #ffffff22 0%, #ffffff99 50%, #ffffff22 100%)' }} />
                    )}
                </>
            ))}
            {open && (
                <Box sx={{ height: 2, mx: 2, my: 0.5, borderRadius: 1, background: 'linear-gradient(90deg, #ffffff22 0%, #ffffff99 50%, #ffffff22 100%)' }} />
            )}
            <MenuItemLink
                to="/buscar-orden-lote"
                primaryText="Buscar por Lote"
                leftIcon={<ListAltIcon sx={{ color: theme.palette.common.white, fontSize: 24, ml: 0, pl: 0, alignSelf: 'center' }} />}
                sidebarIsOpen={open}
                sx={{
                    color: theme.palette.common.white,
                    borderRadius: 0,
                    mx: 1,
                    my: 0,
                    width: open ? '100%' : 56,
                    justifyContent: 'flex-start',
                    position: 'relative',
                    '&.Mui-selected, &.Mui-selected:hover': {
                        background: '#f0f4fa',
                        color: theme.palette.primary.main,
                        fontWeight: 700,
                        '& .RaMenuItemLink-icon': {
                            color: theme.palette.primary.main,
                        },
                    },
                    '& .RaMenuItemLink-icon': {
                        minWidth: 0,
                        ml: 0,
                        mr: 0,
                        pl: 0,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: open ? 40 : '100%',
                        transition: 'color 0.2s',
                    },
                    '& .RaMenuItemLink-label': {
                        display: open ? 'inline' : 'none',
                    },
                }}
            />
        </Box>
    );
};
