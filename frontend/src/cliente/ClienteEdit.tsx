import { Edit, SimpleForm, TextInput } from 'react-admin';

export const ClienteEdit = (props: any) => (
    <Edit {...props} title="Editar Cliente">
        <SimpleForm>
            <TextInput source="nombre" label="Nombre" required />
            <TextInput source="trabajo" label="Trabajo" />
        </SimpleForm>
    </Edit>
);
