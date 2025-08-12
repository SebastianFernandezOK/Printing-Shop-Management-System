import { List, Datagrid, TextField, ReferenceField, BooleanField } from 'react-admin';

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
            <BooleanField source="polimeros" label="Polímeros" />
            <BooleanField source="textos" label="Textos" />
            <BooleanField source="color" label="Color" />
            <BooleanField source="registro" label="Registro" />
            <BooleanField source="resistencia_frote" label="Resistencia Frote" />
            <BooleanField source="medidas" label="Medidas" />
            <BooleanField source="liner" label="Liner" />
            <BooleanField source="metros_impresos" label="Metros Impresos" />
            <BooleanField source="cantidad_tinta" label="Cantidad Tinta" />
            <BooleanField source="cantidad_barniz" label="Cantidad Barniz" />
            {/* Bobinas */}
            {[...Array(18)].map((_, i) => (
                <BooleanField key={i} source={`bobina_${i+1}`} label={`Bobina ${i+1}`} />
            ))}
            <TextField source="observaciones" label="Observaciones" />
        </Datagrid>
    </List>
);
