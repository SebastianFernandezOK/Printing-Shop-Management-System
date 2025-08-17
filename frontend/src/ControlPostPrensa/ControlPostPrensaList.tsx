import { List, Datagrid, TextField, ReferenceField } from 'react-admin';
import BooleanPrettyField from '../BooleanPrettyField';

export const ControlPostPrensaList = (props: any) => (
    <List {...props} title="Control PostPrensa">
        <Datagrid
            rowClick="edit"
            sx={{
                '& .RaDatagrid-row': { minHeight: 32, height: 32 },
                '& .RaDatagrid-cell': { py: 0.5, px: 1, fontSize: '0.95rem', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
            }}
        >
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
            <BooleanPrettyField source="stamping_color" label="Stamping Color" />
            <BooleanPrettyField source="stamping_registro" label="Stamping Registro" />
            <BooleanPrettyField source="medio_corte_medida" label="Medio Corte Medida" />
            <BooleanPrettyField source="medio_corte_liner" label="Medio Corte Liner" />
            <BooleanPrettyField source="relieve_registro" label="Relieve Registro" />
            <BooleanPrettyField source="relieve_altura" label="Relieve Altura" />
            <BooleanPrettyField source="relieve_liner" label="Relieve Liner" />
            {/*
            <BooleanPrettyField source="serigrafia_shablon_nro" label="Serigrafía Shablon Nro" />
            <BooleanPrettyField source="serigrafia_volumen" label="Serigrafía Volumen" />
            <BooleanPrettyField source="serigrafia_control_frote" label="Serigrafía Control Frote" />
            <BooleanPrettyField source="serigrafia_registro" label="Serigrafía Registro" />
            <BooleanPrettyField source="exam_impresion" label="Exam Impresión" />
            <BooleanPrettyField source="exam_stamping" label="Exam Stamping" />
            <BooleanPrettyField source="exam_relieve" label="Exam Relieve" />
            <BooleanPrettyField source="exam_serigrafia" label="Exam Serigrafía" />
            <BooleanPrettyField source="exam_troquelado" label="Exam Troquelado" />
            <BooleanPrettyField source="exam_cantidad" label="Exam Cantidad" />
            <TextField source="firma_stamping" label="Firma Stamping" />
            <TextField source="firma_relieve" label="Firma Relieve" />
            <TextField source="firma_serigrafia" label="Firma Serigrafía" />
            <TextField source="firma_medio_corte" label="Firma Medio Corte" />
            <TextField source="firma_examinadora" label="Firma Examinadora" />
            */}
            <TextField source="observaciones" label="Observaciones" sx={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
        </Datagrid>
    </List>
);
