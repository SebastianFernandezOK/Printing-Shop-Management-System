import { Edit, SimpleForm, TextInput, BooleanInput, PasswordInput, SelectInput, DateField } from 'react-admin';
import { useRoles } from '../useRoles';

const UserEdit = () => {
  const { roles, loading } = useRoles();

  return (
    <Edit>
      <SimpleForm>
        <TextInput source="nombre" label="Nombre" />
        <TextInput source="email" label="Email" />
        <PasswordInput source="password" label="Contraseña" />
        <SelectInput
          source="id_rol"
          label="Rol"
          choices={roles.map(r => ({ id: r.id_rol, name: r.nombre }))}
          optionText="name"
          optionValue="id"
          disabled={loading}
        />
        <BooleanInput source="is_activo" label="Activo" />
        <DateField source="creado_en" label="Fecha de creación" showTime />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
