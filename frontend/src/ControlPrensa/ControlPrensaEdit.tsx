import { Edit, SimpleForm, ReferenceInput, SelectInput, TextInput } from 'react-admin';
import { Paper, Box, Typography, Divider, useTheme } from '@mui/material';
import BooleanPrettyInput from '../BooleanPrettyInput';

export const ControlPrensaEdit = (props: any) => {
    const theme = useTheme();
    return (
        <Edit {...props} title="Editar Control Prensa">
            <Box minHeight="100vh" py={3} sx={{ background: theme.palette.background.default }}>
                <Paper elevation={4} sx={{ maxWidth: 600, mx: 'auto', p: 2, borderRadius: 3, background: theme.palette.background.paper }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>Editar Control Prensa</Typography>
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
                            <BooleanPrettyInput source="polimeros" label="Polímeros" />
                            <BooleanPrettyInput source="textos" label="Textos" />
                            <BooleanPrettyInput source="color" label="Color" />
                            <BooleanPrettyInput source="registro" label="Registro" />
                            <BooleanPrettyInput source="resistencia_frote" label="Resistencia Frote" />
                            <BooleanPrettyInput source="medidas" label="Medidas" />
                            <BooleanPrettyInput source="liner" label="Liner" />
                            <BooleanPrettyInput source="metros_impresos" label="Metros Impresos" />
                            <BooleanPrettyInput source="cantidad_tinta" label="Cantidad Tinta" />
                            <BooleanPrettyInput source="cantidad_barniz" label="Cantidad Barniz" />
                            {[...Array(18)].map((_, i) => (
                                <BooleanPrettyInput key={i} source={`bobina_${i+1}`} label={`Bobina ${i+1}`} />
                            ))}
                            <TextInput source="observaciones" label="Observaciones" multiline size="small" sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }} />
                        </Box>
                    </SimpleForm>
                </Paper>
            </Box>
        </Edit>
    );
}
