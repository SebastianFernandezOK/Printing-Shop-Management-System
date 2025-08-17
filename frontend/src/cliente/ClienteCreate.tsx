import { Create, SimpleForm, TextInput, required } from 'react-admin';
import { Paper, Box, Typography, Divider, useTheme } from '@mui/material';

export const ClienteCreate = (props: any) => {
    const theme = useTheme();
    return (
        <Create {...props} title="Crear Cliente">
            <Box minHeight="100vh" py={3} sx={{ background: theme.palette.background.default }}>
                <Paper elevation={4} sx={{ maxWidth: 400, mx: 'auto', p: 2, borderRadius: 3, background: theme.palette.background.paper }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>Crear Cliente</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <SimpleForm>
                        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={1.5}>
                            <TextInput source="nombre" label="Nombre" validate={required()} size="small" />
                            <TextInput source="cuit" label="CUIT" size="small" />
                            <TextInput source="direccion" label="Dirección" size="small" sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }} />
                        </Box>
                    </SimpleForm>
                </Paper>
            </Box>
        </Create>
    );
}
