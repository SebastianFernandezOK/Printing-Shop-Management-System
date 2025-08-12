import { Show, SimpleShowLayout, TextField, ReferenceField, DateField, TopToolbar, EditButton } from 'react-admin';
import { RemitoPrintButton } from './RemitoPrintButton';

const RemitoShowActions = () => (
    <TopToolbar>
        <EditButton />
        <RemitoPrintButton />
    </TopToolbar>
);

export const RemitoShow = (props: any) => (
    <Show {...props} title="Remito" actions={<RemitoShowActions />}>
        <SimpleShowLayout>
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
        </SimpleShowLayout>
    </Show>
);
