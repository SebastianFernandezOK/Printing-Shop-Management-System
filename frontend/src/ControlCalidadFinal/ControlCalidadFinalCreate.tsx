import { Create, SimpleForm, ReferenceInput, SelectInput, BooleanInput, TextInput, DateTimeInput, NumberInput } from 'react-admin';
import { Paper, Box, Typography, Divider, useTheme } from '@mui/material';

export const ControlCalidadFinalCreate = (props: any) => {
    const theme = useTheme();
    return (
        <Create {...props} title="Crear Control Calidad Final">
            <Box minHeight="100vh" py={3} sx={{ background: theme.palette.background.default }}>
                <Paper elevation={4} sx={{ maxWidth: 600, mx: 'auto', p: 2, borderRadius: 3, background: theme.palette.background.paper }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>Crear Control Calidad Final</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <SimpleForm>
                        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }} gap={1.5}>
                            <ReferenceInput source="id_orden_trabajo" reference="ordenes_trabajo" label="Orden de Trabajo" required>
                                <SelectInput optionText="numero_lote" size="small" />
                            </ReferenceInput>
                            <ReferenceInput source="id_usuario" reference="users" label="Usuario" required>
                                <SelectInput optionText="nombre" size="small" />
                            </ReferenceInput>
                            <DateTimeInput source="fecha_control" label="Fecha de Control" size="small" />
                            <BooleanInput source="aprobado" label="Aprobado" />
                            <NumberInput source="cantidad_inspeccionada" label="Cantidad Inspeccionada" size="small" />
                            <NumberInput source="cantidad_defectuosa" label="Cantidad Defectuosa" size="small" />
                            <TextInput source="observaciones" label="Observaciones" multiline size="small" sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }} />
                        </Box>
                    </SimpleForm>
                </Paper>
            </Box>
        </Create>
    );
}
