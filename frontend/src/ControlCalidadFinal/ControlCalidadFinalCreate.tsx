import { Create, SimpleForm, ReferenceInput, SelectInput, BooleanInput, TextInput, DateTimeInput, NumberInput } from 'react-admin';

export const ControlCalidadFinalCreate = (props: any) => (
    <Create {...props} title="Crear Control Calidad Final">
        <SimpleForm>
            <ReferenceInput source="id_orden_trabajo" reference="ordenes_trabajo" label="Orden de Trabajo" required>
                <SelectInput optionText="numero_lote" />
            </ReferenceInput>
            <ReferenceInput source="id_usuario" reference="users" label="Usuario" required>
                <SelectInput optionText="nombre" />
            </ReferenceInput>
            <DateTimeInput source="fecha_control" label="Fecha de Control" />
            <BooleanInput source="aprobado" label="Aprobado" />
            <NumberInput source="cantidad_inspeccionada" label="Cantidad Inspeccionada" />
            <NumberInput source="cantidad_defectuosa" label="Cantidad Defectuosa" />
            <TextInput source="observaciones" label="Observaciones" multiline />
        </SimpleForm>
    </Create>
);
