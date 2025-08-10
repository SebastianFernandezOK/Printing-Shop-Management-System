import { Create, SimpleForm, TextInput } from 'react-admin';

export const ClienteCreate = (props: any) => (
    <Create {...props} title="Crear Cliente">
        <SimpleForm>
            <TextInput source="nombre" label="Nombre" required />
            <TextInput source="trabajo" label="Trabajo" />
        </SimpleForm>
    </Create>
);
