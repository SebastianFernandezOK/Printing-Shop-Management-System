import { Edit, SimpleForm, ReferenceInput, SelectInput, TextInput, NumberInput, required, number } from 'react-admin';
import { Paper, Box, Typography, Divider, useTheme } from '@mui/material';

export const OrdenTrabajoEdit = (props: any) => {
    const theme = useTheme();
    return (
        <Edit {...props} title="Editar Orden de Trabajo">
            <Box minHeight="100vh" py={3} sx={{ background: theme.palette.background.default }}>
                <Paper elevation={4} sx={{ maxWidth: 600, mx: 'auto', p: 2, borderRadius: 3, background: theme.palette.background.paper }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>Editar Orden de Trabajo</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <SimpleForm>
                        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }} gap={1.5}>
                            <ReferenceInput source="cliente_id" reference="clientes" label="Cliente" required>
                                <SelectInput optionText="nombre" size="small" />
                            </ReferenceInput>
                            <ReferenceInput source="id_tipo_troquelado" reference="troquelados" label="Tipo Troquelado">
                                <SelectInput optionText="nombre" size="small" />
                            </ReferenceInput>
                            <ReferenceInput source="id_sistema" reference="sistemas" label="Sistema">
                                <SelectInput optionText="nombre" size="small" />
                            </ReferenceInput>
                            <ReferenceInput source="id_usuario" reference="users" label="Usuario">
                                <SelectInput optionText="nombre" size="small" />
                            </ReferenceInput>
                            <TextInput source="numero_lote" label="Lote" size="small" />
                            <TextInput source="soporte" label="Soporte" size="small" />
                            <NumberInput source="alto_mm" label="Alto (mm)" validate={[required(), number()]} size="small" />
                            <NumberInput source="ancho_mm" label="Ancho (mm)" validate={[required(), number()]} size="small" />
                            <NumberInput source="z" label="Z" validate={[required(), number()]} size="small" />
                            <NumberInput source="desarrollo" label="Desarrollo" validate={[required(), number()]} size="small" />
                            <NumberInput source="alto_desarrollo" label="Alto Desarrollo" validate={[required(), number()]} size="small" />
                            <NumberInput source="metros" label="Metros" validate={[required(), number()]} size="small" />
                            <NumberInput source="demasia" label="Demasía" validate={[required(), number()]} size="small" />
                            <NumberInput source="cantidad_rollos" label="Rollos" validate={[required(), number()]} size="small" />
                            <NumberInput source="banda" label="Banda" validate={[required(), number()]} size="small" />
                            <TextInput source="lado" label="Lado" size="small" />
                            <NumberInput source="sentido_bobina" label="Sentido Bobina" validate={[required(), number()]} size="small" />
                            <NumberInput source="cantidad_etiquetas" label="Etiquetas" validate={[required(), number()]} size="small" />
                            <TextInput source="observaciones" label="Observaciones" multiline size="small" sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }} />
                        </Box>
                    </SimpleForm>
                </Paper>
            </Box>
        </Edit>
    );
}
