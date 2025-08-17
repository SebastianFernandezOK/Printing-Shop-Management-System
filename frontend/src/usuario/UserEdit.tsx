import { Edit, SimpleForm, TextInput, BooleanInput, PasswordInput, ReferenceInput, SelectInput, DateField, required } from 'react-admin';
import { Paper, Box, Typography, Divider, useTheme } from '@mui/material';

const UserEdit = (props: any) => {
  const theme = useTheme();
  return (
    <Edit {...props} title="Editar Usuario">
      <Box minHeight="100vh" py={3} sx={{ background: theme.palette.background.default }}>
        <Paper elevation={4} sx={{ maxWidth: 400, mx: 'auto', p: 2, borderRadius: 3, background: theme.palette.background.paper }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>Editar Usuario</Typography>
          <Divider sx={{ mb: 2 }} />
          <SimpleForm>
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={1.5}>
              <TextInput source="nombre" label="Nombre" validate={required()} size="small" />
              <TextInput source="email" label="Email" validate={required()} size="small" />
              <PasswordInput source="password" label="Contraseña" size="small" />
              <ReferenceInput source="id_rol" reference="roles" label="Rol">
                <SelectInput optionText="nombre" optionValue="id_rol" size="small" />
              </ReferenceInput>
              <BooleanInput source="is_activo" label="Activo" />
              <DateField source="creado_en" label="Fecha de creación" showTime />
            </Box>
          </SimpleForm>
        </Paper>
      </Box>
    </Edit>
  );
};

export default UserEdit;
