import { Edit, SimpleForm, TextInput, BooleanInput, PasswordInput, ReferenceInput, SelectInput, DateField } from 'react-admin';

const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="nombre" label="Nombre" />
      <TextInput source="email" label="Email" />
      <PasswordInput source="password" label="Contraseña" />
      <ReferenceInput source="id_rol" reference="roles" label="Rol">
        <SelectInput optionText="nombre" optionValue="id_rol" />
      </ReferenceInput>
      <BooleanInput source="is_activo" label="Activo" />
      <DateField source="creado_en" label="Fecha de creación" showTime />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
