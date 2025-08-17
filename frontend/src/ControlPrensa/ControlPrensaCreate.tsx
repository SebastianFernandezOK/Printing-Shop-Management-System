import { Create, SimpleForm, ReferenceInput, SelectInput, TextInput, BooleanInput } from 'react-admin';
import { Paper, Box, Typography, Divider, useTheme } from '@mui/material';

export const ControlPrensaCreate = (props: any) => {
    const theme = useTheme();
    return (
        <Create {...props} title="Crear Control Prensa">
            <Box minHeight="100vh" py={3} sx={{ background: theme.palette.background.default }}>
                <Paper elevation={4} sx={{ maxWidth: 600, mx: 'auto', p: 2, borderRadius: 3, background: theme.palette.background.paper }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>Crear Control Prensa</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <SimpleForm>
                        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }} gap={1.5}>
                            <ReferenceInput source="id_orden_trabajo" reference="ordenes_trabajo" label="Orden de Trabajo" required>
                                <SelectInput optionText="numero_lote" size="small" />
                            </ReferenceInput>
                            <ReferenceInput source="id_usuario" reference="users" label="Usuario" required>
                                <SelectInput optionText="nombre" size="small" />
                            </ReferenceInput>
                            <ReferenceInput source="id_maquina" reference="maquinas" label="Máquina">
                                <SelectInput optionText="nombre" size="small" />
                            </ReferenceInput>
                            <BooleanInput source="polimeros" label="Polímeros" />
                            <BooleanInput source="textos" label="Textos" />
                            <BooleanInput source="color" label="Color" />
                            <BooleanInput source="registro" label="Registro" />
                            <BooleanInput source="resistencia_frote" label="Resistencia Frote" />
                            <BooleanInput source="medidas" label="Medidas" />
                            <BooleanInput source="liner" label="Liner" />
                            <BooleanInput source="metros_impresos" label="Metros Impresos" />
                            <BooleanInput source="cantidad_tinta" label="Cantidad Tinta" />
                            <BooleanInput source="cantidad_barniz" label="Cantidad Barniz" />
                            {[...Array(18)].map((_, i) => (
                                <BooleanInput key={i} source={`bobina_${i+1}`} label={`Bobina ${i+1}`} />
                            ))}
                            <TextInput source="observaciones" label="Observaciones" multiline size="small" sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }} />
                        </Box>
                    </SimpleForm>
                </Paper>
            </Box>
        </Create>
    );
}
