import { List, Datagrid, TextField, ReferenceField } from 'react-admin';
import BooleanPrettyField from '../BooleanPrettyField';

export const ControlPrensaList = (props: any) => (
    <List {...props} title="Control Prensa">
        <Datagrid rowClick="edit">
            <TextField source="id_control_prensa" label="ID" />
            <ReferenceField source="id_orden_trabajo" reference="ordenes_trabajo" label="Orden de Trabajo">
                <TextField source="numero_lote" />
            </ReferenceField>
            <ReferenceField source="id_usuario" reference="users" label="Usuario">
                <TextField source="nombre" />
            </ReferenceField>
            <ReferenceField source="id_maquina" reference="maquinas" label="Máquina">
                <TextField source="nombre" />
            </ReferenceField>
            <BooleanPrettyField source="polimeros" label="Polímeros" />
            <BooleanPrettyField source="textos" label="Textos" />
            <BooleanPrettyField source="color" label="Color" />
            <BooleanPrettyField source="registro" label="Registro" />
            <BooleanPrettyField source="resistencia_frote" label="Resistencia Frote" />
            <BooleanPrettyField source="medidas" label="Medidas" />
            <BooleanPrettyField source="liner" label="Liner" />
            <BooleanPrettyField source="metros_impresos" label="Metros Impresos" />
            <BooleanPrettyField source="cantidad_tinta" label="Cantidad Tinta" />
            <BooleanPrettyField source="cantidad_barniz" label="Cantidad Barniz" />
            {/* Bobinas */}
            {[...Array(18)].map((_, i) => (
                <BooleanPrettyField key={i} source={`bobina_${i+1}`} label={`Bobina ${i+1}`} />
            ))}
            <TextField source="observaciones" label="Observaciones" />
        </Datagrid>
    </List>
);
