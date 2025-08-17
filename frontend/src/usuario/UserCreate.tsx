import { Create, SimpleForm, TextInput, BooleanInput, PasswordInput, SelectInput, required } from 'react-admin';
import { Paper, Box, Typography, Divider, useTheme } from '@mui/material';
import { useRoles } from '../rol/useRoles';

const UserCreate = (props: any) => {
  const { roles, loading } = useRoles();
  const theme = useTheme();

  return (
    <Create {...props} title="Crear Usuario">
      <Box minHeight="100vh" py={3} sx={{ background: theme.palette.background.default }}>
        <Paper elevation={4} sx={{ maxWidth: 400, mx: 'auto', p: 2, borderRadius: 3, background: theme.palette.background.paper }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>Crear Usuario</Typography>
          <Divider sx={{ mb: 2 }} />
          <SimpleForm>
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={1.5}>
              <TextInput source="nombre" label="Nombre" validate={required()} size="small" />
              <TextInput source="email" label="Email" validate={required()} size="small" />
              <PasswordInput source="password" label="Contraseña" validate={required()} size="small" />
              <SelectInput
                source="id_rol"
                label="Rol"
                choices={roles.map(r => ({ id: r.id_rol, name: r.nombre }))}
                optionText="name"
                optionValue="id"
                disabled={loading}
                size="small"
              />
              <BooleanInput source="is_activo" label="Activo" defaultValue={true} />
            </Box>
          </SimpleForm>
        </Paper>
      </Box>
    </Create>
  );
};

export default UserCreate;
