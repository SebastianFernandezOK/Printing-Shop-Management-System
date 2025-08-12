import { Edit, SimpleForm, BooleanInput, TextInput, ReferenceInput, SelectInput } from 'react-admin';


export const ControlPrePrensaEdit = (props: any) => (
    <Edit {...props} title="Editar Control PrePrensa">
        <SimpleForm>
            <ReferenceInput source="id_orden_trabajo" reference="ordenes_trabajo" label="Orden de Trabajo" required>
                <SelectInput optionText="numero_lote" optionValue="id" />
            </ReferenceInput>
            <ReferenceInput source="id_usuario" reference="users" label="Usuario" required>
                <SelectInput optionText="nombre" optionValue="id" />
            </ReferenceInput>
            <BooleanInput source="tipo_curvas" label="Tipo Curvas" />
            <BooleanInput source="banda_2mm_troq" label="Banda 2mm Troq" />
            <BooleanInput source="img_incrustadas" label="Imágenes Incrustadas" />
            <BooleanInput source="circulo_en_banda" label="Círculo en Banda" />
            <BooleanInput source="etiq_centrada" label="Etiqueta Centrada" />
            <BooleanInput source="todos_elementos_etiqueta" label="Todos Elementos Etiqueta" />
            <BooleanInput source="grosor_textos" label="Grosor Textos" />
            <BooleanInput source="guillotinado" label="Guillotinado" />
            <BooleanInput source="seg_color_textos_revertidos" label="2do Color Textos Revertidos" />
            <BooleanInput source="polimero_barniz" label="Polímero Barniz" />
            <BooleanInput source="reduccion" label="Reducción" />
            <BooleanInput source="eliminar_puntos_menos_5" label="Eliminar Puntos < 5" />
            <BooleanInput source="trapping" label="Trapping" />
            <BooleanInput source="logo_zeus" label="Logo Zeus" />
            <TextInput source="observaciones" label="Observaciones" multiline />
        </SimpleForm>
    </Edit>
);
