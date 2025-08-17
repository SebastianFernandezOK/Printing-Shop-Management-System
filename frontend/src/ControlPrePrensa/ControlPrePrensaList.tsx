import { List, Datagrid, TextField, ReferenceField } from 'react-admin';
import BooleanPrettyField from '../BooleanPrettyField';

export const ControlPrePrensaList = (props: any) => (
    <List {...props} title="Control PrePrensa">
        <Datagrid
            rowClick="edit"
            sx={{
                '& .RaDatagrid-row': { minHeight: 32, height: 32 },
                '& .RaDatagrid-cell': { py: 0.5, px: 1, fontSize: '0.95rem', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
            }}
        >
            <TextField source="id_control_preprensa" label="ID" />
            <ReferenceField source="id_orden_trabajo" reference="ordenes_trabajo" label="Orden de Trabajo">
                <TextField source="numero_lote" />
            </ReferenceField>
            <ReferenceField source="id_usuario" reference="users" label="Usuario">
                <TextField source="nombre" />
            </ReferenceField>
            <BooleanPrettyField source="tipo_curvas" label="Tipo Curvas" />
            <BooleanPrettyField source="banda_2mm_troq" label="Banda 2mm Troq" />
            <BooleanPrettyField source="img_incrustadas" label="Imágenes Incrustadas" />
            <BooleanPrettyField source="circulo_en_banda" label="Círculo en Banda" />
            <BooleanPrettyField source="etiq_centrada" label="Etiqueta Centrada" />
            <BooleanPrettyField source="todos_elementos_etiqueta" label="Todos Elementos Etiqueta" />
            <BooleanPrettyField source="grosor_textos" label="Grosor Textos" />
            <BooleanPrettyField source="guillotinado" label="Guillotinado" />
            <BooleanPrettyField source="seg_color_textos_revertidos" label="2do Color Textos Revertidos" />
            <BooleanPrettyField source="polimero_barniz" label="Polímero Barniz" />
            <BooleanPrettyField source="reduccion" label="Reducción" />
            <BooleanPrettyField source="eliminar_puntos_menos_5" label="Eliminar Puntos < 5" />
            <BooleanPrettyField source="trapping" label="Trapping" />
            <BooleanPrettyField source="logo_zeus" label="Logo Zeus" />
            <TextField source="observaciones" label="Observaciones" sx={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
        </Datagrid>
    </List>
);
