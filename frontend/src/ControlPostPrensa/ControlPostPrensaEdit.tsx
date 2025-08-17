import { Edit, SimpleForm, ReferenceInput, SelectInput, TextInput } from 'react-admin';
import { Paper, Box, Typography, Divider, useTheme } from '@mui/material';
import BooleanPrettyInput from '../BooleanPrettyInput';

export const ControlPostPrensaEdit = (props: any) => {
    const theme = useTheme();
    return (
        <Edit {...props} title="Editar Control PostPrensa">
            <Box minHeight="100vh" py={3} sx={{ background: theme.palette.background.default }}>
                <Paper elevation={4} sx={{ maxWidth: 600, mx: 'auto', p: 2, borderRadius: 3, background: theme.palette.background.paper }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>Editar Control PostPrensa</Typography>
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
                            <BooleanPrettyInput source="stamping_color" label="Stamping Color" />
                            <BooleanPrettyInput source="stamping_registro" label="Stamping Registro" />
                            <BooleanPrettyInput source="medio_corte_medida" label="Medio Corte Medida" />
                            <BooleanPrettyInput source="medio_corte_liner" label="Medio Corte Liner" />
                            <BooleanPrettyInput source="relieve_registro" label="Relieve Registro" />
                            <BooleanPrettyInput source="relieve_altura" label="Relieve Altura" />
                            <BooleanPrettyInput source="relieve_liner" label="Relieve Liner" />
                            <BooleanPrettyInput source="serigrafia_shablon_nro" label="Serigrafía Shablon Nro" />
                            <BooleanPrettyInput source="serigrafia_volumen" label="Serigrafía Volumen" />
                            <BooleanPrettyInput source="serigrafia_control_frote" label="Serigrafía Control Frote" />
                            <BooleanPrettyInput source="serigrafia_registro" label="Serigrafía Registro" />
                            <BooleanPrettyInput source="exam_impresion" label="Exam Impresión" />
                            <BooleanPrettyInput source="exam_stamping" label="Exam Stamping" />
                            <BooleanPrettyInput source="exam_relieve" label="Exam Relieve" />
                            <BooleanPrettyInput source="exam_serigrafia" label="Exam Serigrafía" />
                            <BooleanPrettyInput source="exam_troquelado" label="Exam Troquelado" />
                            <BooleanPrettyInput source="exam_cantidad" label="Exam Cantidad" />
                            <TextInput source="firma_stamping" label="Firma Stamping" size="small" />
                            <TextInput source="firma_relieve" label="Firma Relieve" size="small" />
                            <TextInput source="firma_serigrafia" label="Firma Serigrafía" size="small" />
                            <TextInput source="firma_medio_corte" label="Firma Medio Corte" size="small" />
                            <TextInput source="firma_examinadora" label="Firma Examinadora" size="small" />
                            <TextInput source="observaciones" label="Observaciones" multiline size="small" sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }} />
                        </Box>
                    </SimpleForm>
                </Paper>
            </Box>
        </Edit>
    );
};
