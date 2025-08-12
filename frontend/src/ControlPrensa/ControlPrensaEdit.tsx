import { Edit, SimpleForm, ReferenceInput, SelectInput, TextInput, BooleanInput } from 'react-admin';

export const ControlPrensaEdit = (props: any) => (
    <Edit {...props} title="Editar Control Prensa">
        <SimpleForm>
            <ReferenceInput source="id_orden_trabajo" reference="ordenes_trabajo" label="Orden de Trabajo" required>
                <SelectInput optionText="numero_lote" />
            </ReferenceInput>
            <ReferenceInput source="id_usuario" reference="users" label="Usuario" required>
                <SelectInput optionText="nombre" />
            </ReferenceInput>
            <ReferenceInput source="id_maquina" reference="maquinas" label="Máquina">
                <SelectInput optionText="nombre" />
            </ReferenceInput>
            <BooleanInput source="polimeros" label="Polímeros" />
            <BooleanInput source="textos" label="Textos" />
            <BooleanInput source="color" label="Color" />
            <BooleanInput source="registro" label="Registro" />
            <BooleanInput source="resistencia_frote" label="Resistencia Frote" />
            <BooleanInput source="medidas" label="Medidas" />
            <BooleanInput source="liner" label="Liner" />
            <BooleanInput source="metros_impresos" label="Metros Impresos" />
            <BooleanInput source="cantidad_tinta" label="Cantidad Tinta" />
            <BooleanInput source="cantidad_barniz" label="Cantidad Barniz" />
            {[...Array(18)].map((_, i) => (
                <BooleanInput key={i} source={`bobina_${i+1}`} label={`Bobina ${i+1}`} />
            ))}
            <TextInput source="observaciones" label="Observaciones" multiline />
        </SimpleForm>
    </Edit>
);
