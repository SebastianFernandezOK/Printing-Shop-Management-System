import { Menu, MenuItemLink, useSidebarState, useResourceDefinitions } from 'react-admin';
import ListAltIcon from '@mui/icons-material/ListAlt';
import React from 'react';

export const CustomMenu = (props: any) => {
    const [open] = useSidebarState();
    const resources = useResourceDefinitions();
    return (
        <Menu {...props}>
            {Object.values(resources).map((resource: any) => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={resource.options?.label || resource.name}
                    leftIcon={resource.icon ? <resource.icon /> : undefined}
                    sidebarIsOpen={open}
                />
            ))}
            <MenuItemLink
                to="/buscar-orden-lote"
                primaryText="Buscar por Lote"
                leftIcon={<ListAltIcon />}
                sidebarIsOpen={open}
            />
        </Menu>
    );
};
