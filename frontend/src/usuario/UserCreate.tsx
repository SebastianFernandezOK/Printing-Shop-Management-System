import { Create, SimpleForm, TextInput, BooleanInput, PasswordInput, SelectInput } from 'react-admin';
import { useRoles } from '../rol/useRoles';

const UserCreate = () => {
  const { roles, loading } = useRoles();

  return (
    <Create>
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
        <BooleanInput source="is_activo" label="Activo" defaultValue={true} />
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
