import { Create, SimpleForm, TextInput, NumberInput, required } from 'react-admin';
import { Paper, Box, Typography, Divider, useTheme } from '@mui/material';

export const RemitoCreate = (props: any) => {
    const theme = useTheme();
    return (
        <Create {...props} title="Crear Remito">
            <Paper elevation={4} sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, borderRadius: 3, background: theme.palette.background.paper }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>Crear Remito</Typography>
                <Divider sx={{ mb: 2 }} />
                <SimpleForm>
                    <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={1.5}>
                        <TextInput source="numero_remito" label="N° Remito" size="small" />
                        <TextInput source="fecha_emision" label="Fecha Emisión" size="small" />
                        <NumberInput source="cantidad_entregada" label="Cantidad Entregada" validate={required()} size="small" />
                        <TextInput source="observaciones" label="Observaciones" size="small" sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }} />
                    </Box>
                </SimpleForm>
            </Paper>
        </Create>
    );
}
