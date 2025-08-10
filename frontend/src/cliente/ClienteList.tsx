import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

export const ClienteList = (props: any) => (
    <List {...props} title="Clientes">
        <Datagrid rowClick="edit">
            <TextField source="id_cliente" label="ID" />
            <TextField source="nombre" label="Nombre" />
            <TextField source="trabajo" label="Trabajo" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
