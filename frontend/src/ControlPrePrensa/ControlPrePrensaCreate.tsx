import { Create, SimpleForm, TextInput, NumberInput, required } from 'react-admin';
import { Paper, Box, Typography, Divider, useTheme } from '@mui/material';

export const ControlPrePrensaCreate = (props: any) => {
    const theme = useTheme();
    return (
        <Create {...props} title="Crear Control PrePrensa">
            <Box minHeight="100vh" py={3} sx={{ background: theme.palette.background.default }}>
                <Paper elevation={4} sx={{ maxWidth: 600, mx: 'auto', p: 2, borderRadius: 3, background: theme.palette.background.paper }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>Crear Control PrePrensa</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <SimpleForm>
                        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }} gap={1.5}>
                            <TextInput source="id_orden_trabajo" label="Orden de Trabajo" required size="small" />
                            <TextInput source="id_usuario" label="Usuario" required size="small" />
                            <BooleanInput source="tipo_curvas" label="Tipo Curvas" />
                            <BooleanInput source="banda_2mm_troq" label="Banda 2mm Troq" />
                            <BooleanInput source="img_incrustadas" label="Imágenes Incrustadas" />
                            <BooleanInput source="circulo_en_banda" label="Círculo en Banda" />
                            <BooleanInput source="etiq_centrada" label="Etiqueta Centrada" />
                            <BooleanInput source="todos_elementos_etiqueta" label="Todos Elementos Etiqueta" />
                            <BooleanInput source="grosor_textos" label="Grosor Textos" />
                            <BooleanInput source="guillotinado" label="Guillotinado" />
                            <BooleanInput source="seg_color_textos_revertidos" label="2do Color Textos Revertidos" />
                            <BooleanInput source="polimero_barniz" label="Polímero Barniz" />
                            <BooleanInput source="reduccion" label="Reducción" />
                            <BooleanInput source="eliminar_puntos_menos_5" label="Eliminar Puntos < 5" />
                            <BooleanInput source="trapping" label="Trapping" />
                            <BooleanInput source="logo_zeus" label="Logo Zeus" />
                            <TextInput source="observaciones" label="Observaciones" multiline size="small" sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }} />
                        </Box>
                    </SimpleForm>
                </Paper>
            </Box>
        </Create>
    );
}
