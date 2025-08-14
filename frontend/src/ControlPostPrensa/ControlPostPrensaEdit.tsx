import { Edit, SimpleForm, ReferenceInput, SelectInput, TextInput } from 'react-admin';
import BooleanPrettyInput from '../BooleanPrettyInput';

export const ControlPostPrensaEdit = (props: any) => (
    <Edit {...props} title="Editar Control PostPrensa">
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
            <BooleanPrettyInput source="stamping_color" label="Stamping Color" />
            <BooleanPrettyInput source="stamping_registro" label="Stamping Registro" />
            <BooleanPrettyInput source="medio_corte_medida" label="Medio Corte Medida" />
            <BooleanPrettyInput source="medio_corte_liner" label="Medio Corte Liner" />
            <BooleanPrettyInput source="relieve_registro" label="Relieve Registro" />
            <BooleanPrettyInput source="relieve_altura" label="Relieve Altura" />
            <BooleanPrettyInput source="relieve_liner" label="Relieve Liner" />
            <BooleanPrettyInput source="serigrafia_shablon_nro" label="Serigrafía Shablon Nro" />
            <BooleanPrettyInput source="serigrafia_volumen" label="Serigrafía Volumen" />
            <BooleanPrettyInput source="serigrafia_control_frote" label="Serigrafía Control Frote" />
            <BooleanPrettyInput source="serigrafia_registro" label="Serigrafía Registro" />
            <BooleanPrettyInput source="exam_impresion" label="Exam Impresión" />
            <BooleanPrettyInput source="exam_stamping" label="Exam Stamping" />
            <BooleanPrettyInput source="exam_relieve" label="Exam Relieve" />
            <BooleanPrettyInput source="exam_serigrafia" label="Exam Serigrafía" />
            <BooleanPrettyInput source="exam_troquelado" label="Exam Troquelado" />
            <BooleanPrettyInput source="exam_cantidad" label="Exam Cantidad" />
            <TextInput source="firma_stamping" label="Firma Stamping" />
            <TextInput source="firma_relieve" label="Firma Relieve" />
            <TextInput source="firma_serigrafia" label="Firma Serigrafía" />
            <TextInput source="firma_medio_corte" label="Firma Medio Corte" />
            <TextInput source="firma_examinadora" label="Firma Examinadora" />
            <TextInput source="observaciones" label="Observaciones" multiline />
        </SimpleForm>
    </Edit>
);
