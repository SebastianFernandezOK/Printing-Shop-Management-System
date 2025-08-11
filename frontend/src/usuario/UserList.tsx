import { List, Datagrid, TextField, EmailField, BooleanField, FunctionField, DateField, EditButton, DeleteButton } from 'react-admin';
import { useEffect, useState } from 'react';

const UserList = () => {
  const [roles, setRoles] = useState<{ id_rol: number; nombre: string }[]>([]);

  useEffect(() => {
    fetch('/api/roles/')
      .then(res => res.json())
      .then(data => setRoles(data));
  }, []);

  // Helper para mostrar el nombre del rol
  const getRoleName = (id_rol: number) => {
    const rol = roles.find(r => r.id_rol === id_rol);
    return rol ? rol.nombre : id_rol;
  };

  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id_usuario" label="ID" />
        <TextField source="nombre" label="Nombre" />
        <EmailField source="email" label="Email" />
        <BooleanField source="is_activo" label="Activo" />
        {/* Mostrar nombre del rol usando FunctionField */}
        <FunctionField label="Rol" render={(record: any) => getRoleName(record.id_rol)} />
        <DateField source="creado_en" label="Creado en" showTime />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default UserList;