import { Edit, SimpleForm, ReferenceInput, SelectInput, BooleanInput, TextInput } from 'react-admin';

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
            <BooleanInput source="stamping_color" label="Stamping Color" />
            <BooleanInput source="stamping_registro" label="Stamping Registro" />
            <BooleanInput source="medio_corte_medida" label="Medio Corte Medida" />
            <BooleanInput source="medio_corte_liner" label="Medio Corte Liner" />
            <BooleanInput source="relieve_registro" label="Relieve Registro" />
            <BooleanInput source="relieve_altura" label="Relieve Altura" />
            <BooleanInput source="relieve_liner" label="Relieve Liner" />
            <BooleanInput source="serigrafia_shablon_nro" label="Serigrafía Shablon Nro" />
            <BooleanInput source="serigrafia_volumen" label="Serigrafía Volumen" />
            <BooleanInput source="serigrafia_control_frote" label="Serigrafía Control Frote" />
            <BooleanInput source="serigrafia_registro" label="Serigrafía Registro" />
            <BooleanInput source="exam_impresion" label="Exam Impresión" />
            <BooleanInput source="exam_stamping" label="Exam Stamping" />
            <BooleanInput source="exam_relieve" label="Exam Relieve" />
            <BooleanInput source="exam_serigrafia" label="Exam Serigrafía" />
            <BooleanInput source="exam_troquelado" label="Exam Troquelado" />
            <BooleanInput source="exam_cantidad" label="Exam Cantidad" />
            <TextInput source="firma_stamping" label="Firma Stamping" />
            <TextInput source="firma_relieve" label="Firma Relieve" />
            <TextInput source="firma_serigrafia" label="Firma Serigrafía" />
            <TextInput source="firma_medio_corte" label="Firma Medio Corte" />
            <TextInput source="firma_examinadora" label="Firma Examinadora" />
            <TextInput source="observaciones" label="Observaciones" multiline />
        </SimpleForm>
    </Edit>
);
