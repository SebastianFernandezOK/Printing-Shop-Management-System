import { Edit, SimpleForm, ReferenceInput, SelectInput, TextInput } from 'react-admin';
import BooleanPrettyInput from '../BooleanPrettyInput';

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
            <BooleanPrettyInput source="polimeros" label="Polímeros" />
            <BooleanPrettyInput source="textos" label="Textos" />
            <BooleanPrettyInput source="color" label="Color" />
            <BooleanPrettyInput source="registro" label="Registro" />
            <BooleanPrettyInput source="resistencia_frote" label="Resistencia Frote" />
            <BooleanPrettyInput source="medidas" label="Medidas" />
            <BooleanPrettyInput source="liner" label="Liner" />
            <BooleanPrettyInput source="metros_impresos" label="Metros Impresos" />
            <BooleanPrettyInput source="cantidad_tinta" label="Cantidad Tinta" />
            <BooleanPrettyInput source="cantidad_barniz" label="Cantidad Barniz" />
            {[...Array(18)].map((_, i) => (
                <BooleanPrettyInput key={i} source={`bobina_${i+1}`} label={`Bobina ${i+1}`} />
            ))}
            <TextInput source="observaciones" label="Observaciones" multiline />
        </SimpleForm>
    </Edit>
);
