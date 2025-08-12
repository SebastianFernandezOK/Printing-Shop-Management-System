import { Edit, SimpleForm, ReferenceInput, SelectInput, TextInput, DateTimeInput, NumberInput } from 'react-admin';

export const RemitoEdit = (props: any) => (
    <Edit {...props} title="Editar Remito">
        <SimpleForm>
            <TextInput source="numero_remito" label="N° Remito" required />
            <ReferenceInput source="id_orden_trabajo" reference="ordenes_trabajo" label="Orden de Trabajo" required>
                <SelectInput optionText="numero_lote" />
            </ReferenceInput>
            <DateTimeInput source="fecha_emision" label="Fecha Emisión" />
            <NumberInput source="cantidad_entregada" label="Cantidad Entregada" />
            <TextInput source="observaciones" label="Observaciones" multiline />
            <ReferenceInput source="id_usuario" reference="users" label="Usuario" required>
                <SelectInput optionText="nombre" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
