import { List, Datagrid, TextField, NumberField, DateField, EditButton, DeleteButton, ReferenceField } from 'react-admin';

export const OrdenTrabajoList = (props: any) => (
    <List {...props} title="Órdenes de Trabajo">
        <Datagrid rowClick="edit">
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
            <TextField source="estado_actual" label="Estado" />
            <TextField source="soporte" label="Soporte" />
            <NumberField source="alto_mm" label="Alto (mm)" />
            <NumberField source="ancho_mm" label="Ancho (mm)" />
            <NumberField source="z" label="Z" />
            <NumberField source="desarrollo" label="Desarrollo" />
            <NumberField source="alto_desarrollo" label="Alto Desarrollo" />
            <NumberField source="metros" label="Metros" />
            <NumberField source="demasia" label="Demasía" />
            <NumberField source="cantidad_rollos" label="Rollos" />
            <TextField source="banda" label="Banda" />
            <TextField source="lado" label="Lado" />
            <TextField source="sentido_bobina" label="Sentido Bobina" />
            <NumberField source="cantidad_etiquetas" label="Etiquetas" />
            <TextField source="observaciones" label="Observaciones" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
