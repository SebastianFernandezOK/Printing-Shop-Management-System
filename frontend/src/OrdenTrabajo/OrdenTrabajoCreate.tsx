import { Create, SimpleForm, ReferenceInput, SelectInput, TextInput, NumberInput, required, number } from 'react-admin';

export const OrdenTrabajoCreate = (props: any) => (
    <Create {...props} title="Crear Orden de Trabajo">
        <SimpleForm>
            <ReferenceInput source="cliente_id" reference="clientes" label="Cliente" required>
                <SelectInput optionText="nombre" />
            </ReferenceInput>
            <ReferenceInput source="id_tipo_troquelado" reference="troquelados" label="Tipo Troquelado">
                <SelectInput optionText="nombre" />
            </ReferenceInput>
            <ReferenceInput source="id_sistema" reference="sistemas" label="Sistema">
                <SelectInput optionText="nombre" />
            </ReferenceInput>
            <ReferenceInput source="id_etapa" reference="etapas" label="Etapa">
                <SelectInput optionText="nombre" />
            </ReferenceInput>
            <ReferenceInput source="id_usuario" reference="users" label="Usuario">
                <SelectInput optionText="nombre" />
            </ReferenceInput>
            <TextInput source="numero_lote" label="Lote" />
            {/* <DateInput source="fecha_creacion" label="Fecha Creación" /> */}
            <TextInput source="estado_actual" label="Estado" />
            <TextInput source="soporte" label="Soporte" />
            <NumberInput source="alto_mm" label="Alto (mm)" validate={[required(), number()]} />
            <NumberInput source="ancho_mm" label="Ancho (mm)" validate={[required(), number()]} />
            <NumberInput source="z" label="Z" validate={[required(), number()]} />
            <NumberInput source="desarrollo" label="Desarrollo" validate={[required(), number()]} />
            <NumberInput source="alto_desarrollo" label="Alto Desarrollo" validate={[required(), number()]} />
            <NumberInput source="metros" label="Metros" validate={[required(), number()]} />
            <NumberInput source="demasia" label="Demasía" validate={[required(), number()]} />
            <NumberInput source="cantidad_rollos" label="Rollos" validate={[required(), number()]} />
            <NumberInput source="banda" label="Banda" validate={[required(), number()]} />
            <TextInput source="lado" label="Lado" />
            <NumberInput source="sentido_bobina" label="Sentido Bobina" validate={[required(), number()]} />
            <NumberInput source="cantidad_etiquetas" label="Etiquetas" validate={[required(), number()]} />
            <TextInput source="observaciones" label="Observaciones" multiline />
        </SimpleForm>
    </Create>
);
