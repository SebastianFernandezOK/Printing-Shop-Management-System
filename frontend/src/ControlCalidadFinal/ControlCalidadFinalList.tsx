import { List, Datagrid, TextField, ReferenceField, BooleanField, DateField } from 'react-admin';

export const ControlCalidadFinalList = (props: any) => (
    <List {...props} title="Control Calidad Final">
        <Datagrid rowClick="edit">
            <TextField source="id_control_calidad" label="ID" />
            <ReferenceField source="id_orden_trabajo" reference="ordenes_trabajo" label="Orden de Trabajo">
                <TextField source="numero_lote" />
            </ReferenceField>
            <ReferenceField source="id_usuario" reference="users" label="Usuario">
                <TextField source="nombre" />
            </ReferenceField>
            <DateField source="fecha_control" label="Fecha de Control" />
            <BooleanField source="aprobado" label="Aprobado" />
            <TextField source="cantidad_inspeccionada" label="Cantidad Inspeccionada" />
            <TextField source="cantidad_defectuosa" label="Cantidad Defectuosa" />
            <TextField source="observaciones" label="Observaciones" />
        </Datagrid>
    </List>
);
