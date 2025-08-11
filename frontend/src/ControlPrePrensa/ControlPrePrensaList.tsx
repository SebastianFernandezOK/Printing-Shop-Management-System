import { List, Datagrid, TextField, BooleanField, ReferenceField } from 'react-admin';

export const ControlPrePrensaList = (props: any) => (
    <List {...props} title="Control PrePrensa">
        <Datagrid rowClick="edit">
            <TextField source="id_control_preprensa" label="ID" />
            <ReferenceField source="id_orden_trabajo" reference="ordenes_trabajo" label="Orden de Trabajo">
                <TextField source="numero_lote" />
            </ReferenceField>
            <ReferenceField source="id_usuario" reference="users" label="Usuario">
                <TextField source="email" />
            </ReferenceField>
            <BooleanField source="tipo_curvas" label="Tipo Curvas" />
            <BooleanField source="banda_2mm_troq" label="Banda 2mm Troq" />
            <BooleanField source="img_incrustadas" label="Imágenes Incrustadas" />
            <BooleanField source="circulo_en_banda" label="Círculo en Banda" />
            <BooleanField source="etiq_centrada" label="Etiqueta Centrada" />
            <BooleanField source="todos_elementos_etiqueta" label="Todos Elementos Etiqueta" />
            <BooleanField source="grosor_textos" label="Grosor Textos" />
            <BooleanField source="guillotinado" label="Guillotinado" />
            <BooleanField source="seg_color_textos_revertidos" label="2do Color Textos Revertidos" />
            <BooleanField source="polimero_barniz" label="Polímero Barniz" />
            <BooleanField source="reduccion" label="Reducción" />
            <BooleanField source="eliminar_puntos_menos_5" label="Eliminar Puntos < 5" />
            <BooleanField source="trapping" label="Trapping" />
            <BooleanField source="logo_zeus" label="Logo Zeus" />
            <TextField source="observaciones" label="Observaciones" />
        </Datagrid>
    </List>
);
