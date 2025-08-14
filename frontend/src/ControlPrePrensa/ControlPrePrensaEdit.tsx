import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';
import BooleanPrettyInput from '../BooleanPrettyInput';


export const ControlPrePrensaEdit = (props: any) => (
    <Edit {...props} title="Editar Control PrePrensa">
        <SimpleForm>
            <ReferenceInput source="id_orden_trabajo" reference="ordenes_trabajo" label="Orden de Trabajo" required>
                <SelectInput optionText="numero_lote" optionValue="id" />
            </ReferenceInput>
            <ReferenceInput source="id_usuario" reference="users" label="Usuario" required>
                <SelectInput optionText="nombre" optionValue="id" />
            </ReferenceInput>
            <BooleanPrettyInput source="tipo_curvas" label="Tipo Curvas" />
            <BooleanPrettyInput source="banda_2mm_troq" label="Banda 2mm Troq" />
            <BooleanPrettyInput source="img_incrustadas" label="Imágenes Incrustadas" />
            <BooleanPrettyInput source="circulo_en_banda" label="Círculo en Banda" />
            <BooleanPrettyInput source="etiq_centrada" label="Etiqueta Centrada" />
            <BooleanPrettyInput source="todos_elementos_etiqueta" label="Todos Elementos Etiqueta" />
            <BooleanPrettyInput source="grosor_textos" label="Grosor Textos" />
            <BooleanPrettyInput source="guillotinado" label="Guillotinado" />
            <BooleanPrettyInput source="seg_color_textos_revertidos" label="2do Color Textos Revertidos" />
            <BooleanPrettyInput source="polimero_barniz" label="Polímero Barniz" />
            <BooleanPrettyInput source="reduccion" label="Reducción" />
            <BooleanPrettyInput source="eliminar_puntos_menos_5" label="Eliminar Puntos < 5" />
            <BooleanPrettyInput source="trapping" label="Trapping" />
            <BooleanPrettyInput source="logo_zeus" label="Logo Zeus" />
            <TextInput source="observaciones" label="Observaciones" multiline />
        </SimpleForm>
    </Edit>
);
