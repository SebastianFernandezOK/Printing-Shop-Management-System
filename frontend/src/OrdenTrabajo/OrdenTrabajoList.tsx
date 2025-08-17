import { List, Datagrid, TextField, NumberField, DateField, EditButton, DeleteButton, ReferenceField } from 'react-admin';


export const OrdenTrabajoList = (props: any) => (
    <List {...props} title="Órdenes de Trabajo">
        <Datagrid
            rowClick="edit"
            sx={{
                '& .RaDatagrid-row': { minHeight: 32, height: 32 },
                '& .RaDatagrid-cell': { py: 0.5, px: 1, fontSize: '0.95rem', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
            }}
        >
            <NumberField source="id_orden_trabajo" label="ID" />
            <ReferenceField source="cliente_id" reference="clientes" label="Cliente">
                <TextField source="nombre" />
            </ReferenceField>
            <ReferenceField source="id_tipo_troquelado" reference="troquelados" label="Tipo Troquelado">
                <TextField source="nombre" />
            </ReferenceField>
            <ReferenceField source="id_sistema" reference="sistemas" label="Sistema">
                <TextField source="nombre" />
            </ReferenceField>
            <ReferenceField source="id_etapa" reference="etapas" label="Etapa">
                <TextField source="nombre" />
            </ReferenceField>
            <ReferenceField source="id_usuario" reference="users" label="Usuario">
                <TextField source="nombre" />
            </ReferenceField>
            <TextField source="numero_lote" label="Lote" />
            <DateField source="fecha_creacion" label="Fecha Creación" />
            <ReferenceField source="id_estado" reference="estados" label="Estado">
                <TextField source="nombre" />
            </ReferenceField>
            <TextField source="soporte" label="Soporte" />
            <NumberField source="alto_mm" label="Alto (mm)" />
            <NumberField source="ancho_mm" label="Ancho (mm)" />
            {/*
            <NumberField source="z" label="Z" />
            <NumberField source="desarrollo" label="Desarrollo" />
            <NumberField source="alto_desarrollo" label="Alto Desarrollo" />
            <NumberField source="metros" label="Metros" />
            <NumberField source="demasia" label="Demasía" />
            <NumberField source="cantidad_rollos" label="Rollos" />
            <TextField source="banda" label="Banda" />
            <TextField source="lado" label="Lado" />
            <TextField source="sentido_bobina" label="Sentido Bobina" />
            <NumberField source="cantidad_etiquetas" label="Etiquetas" />
            */}
            <TextField source="observaciones" label="Observaciones" sx={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
