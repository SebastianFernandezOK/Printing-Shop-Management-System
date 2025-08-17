import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';
import { Paper, Box, Typography, Divider, useTheme } from '@mui/material';
import BooleanPrettyInput from '../BooleanPrettyInput';


export const ControlPrePrensaEdit = (props: any) => {
    const theme = useTheme();
    return (
        <Edit {...props} title="Editar Control PrePrensa">
            <Box minHeight="100vh" py={3} sx={{ background: theme.palette.background.default }}>
                <Paper elevation={4} sx={{ maxWidth: 600, mx: 'auto', p: 2, borderRadius: 3, background: theme.palette.background.paper }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>Editar Control PrePrensa</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <SimpleForm>
                        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }} gap={1.5}>
                            <ReferenceInput source="id_orden_trabajo" reference="ordenes_trabajo" label="Orden de Trabajo" required>
                                <SelectInput optionText="numero_lote" optionValue="id" size="small" />
                            </ReferenceInput>
                            <ReferenceInput source="id_usuario" reference="users" label="Usuario" required>
                                <SelectInput optionText="nombre" optionValue="id" size="small" />
                            </ReferenceInput>
                            <BooleanPrettyInput source="tipo_curvas" label="Tipo Curvas" />
                            <BooleanPrettyInput source="banda_2mm_troq" label="Banda 2mm Troq" />
                            <BooleanPrettyInput source="img_incrustadas" label="Imágenes Incrustadas" />
                            <BooleanPrettyInput source="circulo_en_banda" label="Círculo en Banda" />
                            <BooleanPrettyInput source="etiq_centrada" label="Etiqueta Centrada" />
                            <BooleanPrettyInput source="todos_elementos_etiqueta" label="Todos Elementos Etiqueta" />
                            <BooleanPrettyInput source="grosor_textos" label="Grosor Textos" />
                            <BooleanPrettyInput source="guillotinado" label="Guillotinado" />
                            <BooleanPrettyInput source="seg_color_textos_revertidos" label="2do Color Textos Revertidos" />
                            <BooleanPrettyInput source="polimero_barniz" label="Polímero Barniz" />
                            <BooleanPrettyInput source="reduccion" label="Reducción" />
                            <BooleanPrettyInput source="eliminar_puntos_menos_5" label="Eliminar Puntos < 5" />
                            <BooleanPrettyInput source="trapping" label="Trapping" />
                            <BooleanPrettyInput source="logo_zeus" label="Logo Zeus" />
                            <TextInput source="observaciones" label="Observaciones" multiline size="small" sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }} />
                        </Box>
                    </SimpleForm>
                </Paper>
            </Box>
        </Edit>
    );
};
