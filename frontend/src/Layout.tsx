import { Layout as RALayout, Sidebar as RASidebar } from "react-admin";
import { CustomMenu } from "./CustomMenu";
import { useTheme } from '@mui/material';

const CustomSidebar = (props: any) => {
    const theme = useTheme();
    return (
        <RASidebar {...props} sx={{
            bgcolor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main,
            color: theme.palette.common.white,
            borderRight: `1px solid ${theme.palette.divider}`,
            '& .RaSidebar-fixed': { bgcolor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main },
            '& .RaSidebar-open': { bgcolor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main },
            '& .RaSidebar-closed': { bgcolor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main },
            '& .RaSidebar-menu': {
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
            },
            '& .RaSidebar-menu .RaMenuItemLink-root': {
                color: theme.palette.common.white,
                borderRadius: 0,
                px: 2,
                my: 0,
                position: 'relative',
                transition: 'background 0.2s',
                '&:not(:last-child)::after': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    left: 16,
                    right: 16,
                    bottom: 0,
                    height: '1.5px',
                    background: 'linear-gradient(90deg, #ffffff22 0%, #ffffff55 50%, #ffffff22 100%)',
                    borderRadius: 1,
                },
            },
            '& .RaSidebar-menu .RaMenuItemLink-root.Mui-selected': {
                background: 'linear-gradient(90deg, #e0e7ef 0%, #f5f7fa 100%)',
                color: theme.palette.primary.main,
                boxShadow: '0 2px 8px 0 #0001',
                fontWeight: 700,
                '& .RaMenuItemLink-icon': {
                    color: theme.palette.primary.main,
                },
            },
            '& .RaSidebar-menu .RaMenuItemLink-root:hover': {
                background: 'linear-gradient(90deg, #e0e7ef55 0%, #f5f7fa55 100%)',
                color: theme.palette.primary.main,
            },
            '& .RaSidebar-menu .RaMenuItemLink-icon': {
                color: theme.palette.common.white,
                transition: 'color 0.2s',
            },
        }} />
    );
};

export const Layout = (props: any) => (
    <RALayout
        {...props}
        menu={CustomMenu}
        sidebar={CustomSidebar}
    />
);
