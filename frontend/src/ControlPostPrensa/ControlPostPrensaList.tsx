import { List, Datagrid, TextField, ReferenceField, BooleanField } from 'react-admin';

export const ControlPostPrensaList = (props: any) => (
    <List {...props} title="Control PostPrensa">
        <Datagrid rowClick="edit">
            <TextField source="id_control_post_prensa" label="ID" />
            <ReferenceField source="id_orden_trabajo" reference="ordenes_trabajo" label="Orden de Trabajo">
                <TextField source="numero_lote" />
            </ReferenceField>
            <ReferenceField source="id_usuario" reference="users" label="Usuario">
                <TextField source="nombre" />
            </ReferenceField>
            <ReferenceField source="id_maquina" reference="maquinas" label="Máquina">
                <TextField source="nombre" />
            </ReferenceField>
            <BooleanField source="stamping_color" label="Stamping Color" />
            <BooleanField source="stamping_registro" label="Stamping Registro" />
            <BooleanField source="medio_corte_medida" label="Medio Corte Medida" />
            <BooleanField source="medio_corte_liner" label="Medio Corte Liner" />
            <BooleanField source="relieve_registro" label="Relieve Registro" />
            <BooleanField source="relieve_altura" label="Relieve Altura" />
            <BooleanField source="relieve_liner" label="Relieve Liner" />
            <BooleanField source="serigrafia_shablon_nro" label="Serigrafía Shablon Nro" />
            <BooleanField source="serigrafia_volumen" label="Serigrafía Volumen" />
            <BooleanField source="serigrafia_control_frote" label="Serigrafía Control Frote" />
            <BooleanField source="serigrafia_registro" label="Serigrafía Registro" />
            <BooleanField source="exam_impresion" label="Exam Impresión" />
            <BooleanField source="exam_stamping" label="Exam Stamping" />
            <BooleanField source="exam_relieve" label="Exam Relieve" />
            <BooleanField source="exam_serigrafia" label="Exam Serigrafía" />
            <BooleanField source="exam_troquelado" label="Exam Troquelado" />
            <BooleanField source="exam_cantidad" label="Exam Cantidad" />
            <TextField source="firma_stamping" label="Firma Stamping" />
            <TextField source="firma_relieve" label="Firma Relieve" />
            <TextField source="firma_serigrafia" label="Firma Serigrafía" />
            <TextField source="firma_medio_corte" label="Firma Medio Corte" />
            <TextField source="firma_examinadora" label="Firma Examinadora" />
            <TextField source="observaciones" label="Observaciones" />
        </Datagrid>
    </List>
);
