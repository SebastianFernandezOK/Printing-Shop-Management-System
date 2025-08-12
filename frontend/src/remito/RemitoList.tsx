import { List, Datagrid, TextField, ReferenceField, DateField } from 'react-admin';

export const RemitoList = (props: any) => (
    <List {...props} title="Remitos">
        <Datagrid rowClick="show">
            <TextField source="id_remito" label="ID" />
            <TextField source="numero_remito" label="N° Remito" />
            <ReferenceField source="id_orden_trabajo" reference="ordenes_trabajo" label="Orden de Trabajo">
                <TextField source="numero_lote" />
            </ReferenceField>
            <DateField source="fecha_emision" label="Fecha Emisión" />
            <TextField source="cantidad_entregada" label="Cantidad Entregada" />
            <TextField source="observaciones" label="Observaciones" />
            <ReferenceField source="id_usuario" reference="users" label="Usuario">
                <TextField source="nombre" />
            </ReferenceField>
        </Datagrid>
    </List>
);
