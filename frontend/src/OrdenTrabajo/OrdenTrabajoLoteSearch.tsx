import { useState } from 'react';
import { TextField, Button, Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/HighlightOff';

const apartados = [
    { label: 'Orden de Trabajo', fields: [
        'numero_lote', 'fecha_creacion', 'estado_nombre', 'soporte', 'alto_mm', 'ancho_mm', 'z', 'desarrollo', 'alto_desarrollo', 'metros', 'demasia', 'cantidad_rollos', 'banda', 'lado', 'sentido_bobina', 'cantidad_etiquetas', 'observaciones',
        'cliente_nombre', 'tipo_troquelado_nombre', 'sistema_nombre', 'etapa_nombre', 'usuario_nombre'
    ] },
    { label: 'Control PrePrensa', fields: [
        'usuario_preprensa_nombre', 'tipo_curvas', 'banda_2mm_troq', 'img_incrustadas', 'circulo_en_banda', 'etiq_centrada', 'todos_elementos_etiqueta', 'grosor_textos', 'guillotinado', 'seg_color_textos_revertidos', 'polimero_barniz', 'reduccion', 'eliminar_puntos_menos_5', 'trapping', 'logo_zeus', 'observaciones_preprensa'
    ] },
    { label: 'Control Prensa', fields: [
        'maquina_prensa_nombre', 'usuario_prensa_nombre', 'polimeros', 'textos', 'color', 'registro', 'resistencia_frote', 'medidas', 'liner', 'metros_impresos', 'cantidad_tinta', 'cantidad_barniz',
        ...Array.from({length: 18}, (_, i) => `bobina_${i+1}`), 'observaciones_prensa'
    ] },
    { label: 'Control PostPrensa', fields: [
        'maquina_postprensa_nombre', 'usuario_postprensa_nombre', 'stamping_color', 'stamping_registro', 'medio_corte_medida', 'medio_corte_liner', 'relieve_registro', 'relieve_altura', 'relieve_liner', 'serigrafia_shablon_nro', 'serigrafia_volumen', 'serigrafia_control_frote', 'serigrafia_registro', 'exam_impresion', 'exam_stamping', 'exam_relieve', 'exam_serigrafia', 'exam_troquelado', 'exam_cantidad', 'firma_stamping', 'firma_relieve', 'firma_serigrafia', 'firma_medio_corte', 'firma_examinadora', 'observaciones_postprensa'
    ] },
    { label: 'Control Calidad Final', fields: [
        'fecha_control', 'aprobado', 'cantidad_inspeccionada', 'cantidad_defectuosa', 'observaciones_calidad', 'usuario_calidad_nombre'
    ] },
    { label: 'Remito', fields: [
        'numero_remito', 'fecha_emision', 'cantidad_entregada', 'observaciones_remito', 'usuario_remito_nombre'
    ] },
];

const fieldLabels: Record<string, string> = {
    // Orden de Trabajo
    id_orden_trabajo: 'Orden de Trabajo',
    cliente_id: 'Cliente',
    cliente_nombre: 'Cliente',
    id_tipo_troquelado: 'Tipo de Troquelado',
    tipo_troquelado_nombre: 'Tipo de Troquelado',
    id_sistema: 'Sistema de Impresión',
    sistema_nombre: 'Sistema de Impresión',
    id_etapa: 'Etapa',
    etapa_nombre: 'Etapa',
    id_usuario: 'Usuario',
    usuario_nombre: 'Usuario',
    numero_lote: 'N° Lote',
    fecha_creacion: 'Fecha de Creación',
    estado_nombre: 'Estado',
    soporte: 'Soporte',
    alto_mm: 'Alto (mm)',
    ancho_mm: 'Ancho (mm)',
    z: 'Z',
    desarrollo: 'Desarrollo',
    alto_desarrollo: 'Alto Desarrollo',
    metros: 'Metros',
    demasia: 'Demasía',
    cantidad_rollos: 'Cantidad de Rollos',
    banda: 'Banda',
    lado: 'Lado',
    sentido_bobina: 'Sentido de Bobina',
    cantidad_etiquetas: 'Cantidad de Etiquetas',
    observaciones: 'Observaciones',
    
    // PrePrensa
    id_control_preprensa: 'Control PrePrensa',
    id_usuario_preprensa: 'Responsable PrePrensa',
    usuario_preprensa_nombre: 'Responsable PrePrensa',
    tipo_curvas: 'Tipo de Curvas',
    banda_2mm_troq: 'Banda 2mm Troquelado',
    img_incrustadas: 'Imágenes Incrustadas',
    circulo_en_banda: 'Círculo en Banda',
    etiq_centrada: 'Etiqueta Centrada',
    todos_elementos_etiqueta: 'Todos los Elementos de la Etiqueta',
    grosor_textos: 'Grosor de Textos',
    guillotinado: 'Guillotinado',
    seg_color_textos_revertidos: '2do Color Textos Revertidos',
    polimero_barniz: 'Polímero Barniz',
    reduccion: 'Reducción',
    eliminar_puntos_menos_5: 'Eliminar Puntos < 5',
    trapping: 'Trapping',
    logo_zeus: 'Logo Zeus',
    observaciones_preprensa: 'Observaciones',
    // Prensa
    id_control_prensa: 'Control Prensa',
    id_maquina_prensa: 'Máquina',
    maquina_prensa_nombre: 'Máquina',
    id_usuario_prensa: 'Responsable Prensa',
    usuario_prensa_nombre: 'Responsable Prensa',
    polimeros: 'Polímeros',
    textos: 'Textos',
    color: 'Color',
    registro: 'Registro',
    resistencia_frote: 'Resistencia al Frote',
    medidas: 'Medidas',
    liner: 'Liner',
    metros_impresos: 'Metros Impresos',
    cantidad_tinta: 'Cantidad de Tinta',
    cantidad_barniz: 'Cantidad de Barniz',
    observaciones_prensa: 'Observaciones',
    // Bobinas
    ...Object.fromEntries(Array.from({length: 18}, (_, i) => [`bobina_${i+1}`, `Bobina ${i+1}`])),
    // PostPrensa
    id_control_post_prensa: 'Control PostPrensa',
    id_maquina_postprensa: 'Máquina',
    maquina_postprensa_nombre: 'Máquina',
    id_usuario_postprensa: 'Responsable PostPrensa',
    usuario_postprensa_nombre: 'Responsable PostPrensa',
    stamping_color: 'Stamping Color',
    stamping_registro: 'Stamping Registro',
    medio_corte_medida: 'Medio Corte Medida',
    medio_corte_liner: 'Medio Corte Liner',
    relieve_registro: 'Relieve Registro',
    relieve_altura: 'Relieve Altura',
    relieve_liner: 'Relieve Liner',
    serigrafia_shablon_nro: 'Serigrafía Shablón Nro',
    serigrafia_volumen: 'Serigrafía Volumen',
    serigrafia_control_frote: 'Serigrafía Control Frote',
    serigrafia_registro: 'Serigrafía Registro',
    exam_impresion: 'Examinadora Impresión',
    exam_stamping: 'Examinadora Stamping',
    exam_relieve: 'Examinadora Relieve',
    exam_serigrafia: 'Examinadora Serigrafía',
    exam_troquelado: 'Examinadora Troquelado',
    exam_cantidad: 'Examinadora Cantidad',
    firma_stamping: 'Firma Stamping',
    firma_relieve: 'Firma Relieve',
    firma_serigrafia: 'Firma Serigrafía',
    firma_medio_corte: 'Firma Medio Corte',
    firma_examinadora: 'Firma Examinadora',
    observaciones_postprensa: 'Observaciones',
    // Calidad Final
    id_control_calidad: 'Control Calidad',
    fecha_control: 'Fecha de Control',
    aprobado: 'Aprobado',
    cantidad_inspeccionada: 'Cantidad Inspeccionada',
    cantidad_defectuosa: 'Cantidad Defectuosa',
    observaciones_calidad: 'Observaciones',
    id_usuario_calidad: 'Responsable Calidad',
    usuario_calidad_nombre: 'Responsable Calidad',
    // Remito
    id_remito: 'Remito',
    numero_remito: 'N° Remito',
    fecha_emision: 'Fecha de Emisión',
    cantidad_entregada: 'Cantidad Entregada',
    observaciones_remito: 'Observaciones',
    id_usuario_remito: 'Responsable Remito',
    usuario_remito_nombre: 'Responsable Remito',
};

function beautifyValue(val: any, key?: string) {
    if (typeof val === 'boolean') {
        return val ? <CheckIcon color="success" fontSize="medium" sx={{ verticalAlign: 'middle' }} /> : <CloseIcon color="error" fontSize="medium" sx={{ verticalAlign: 'middle' }} />;
    }
    if (key === 'fecha_creacion' && val) {
        return new Date(val).toLocaleString();
    }
    if (typeof val === 'string' && val.length > 60) {
        return <span style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{val}</span>;
    }
    if (val instanceof Date || (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}/.test(val))) {
        return new Date(val).toLocaleString();
    }
    return <span style={{ color: '#222', fontWeight: 500 }}>{String(val)}</span>;
}

interface Apartado {
    label: string;
    fields: string[];
}

function getFieldsForApartado(apartado: Apartado, dataKeys: string[]): string[] {
    return apartado.fields.filter((f: string) => dataKeys.includes(f));
}

function renderSection(label: string, data: any, keys: string[]) {
    if (keys.length === 0) return null;
    return (
        <Paper elevation={4} sx={{ mb: 4, borderRadius: 3, p: 2, background: '#f8fafc' }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'primary.dark', fontWeight: 700, letterSpacing: 1 }}>{label}</Typography>
            <TableContainer>
                <Table size="small">
                    <TableBody>
                        {keys.map((f, idx) => (
                            <TableRow key={f} sx={{ background: idx % 2 === 0 ? '#f3f6fa' : '#fff' }}>
                                <TableCell sx={{ fontWeight: 600, width: 260, color: 'primary.main', fontSize: 16 }}>{fieldLabels[f] || f.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</TableCell>
                                <TableCell sx={{ fontSize: 16 }}>{beautifyValue(data[f], f)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export const OrdenTrabajoLoteSearch = () => {
    const [lote, setLote] = useState('');
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setError('');
        setData(null);
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/ordenes_trabajo_custom/by_lote/${lote}`);
            if (!res.ok) throw new Error('No encontrado');
            const json = await res.json();
            setData(json);
        } catch (e: any) {
            setError('No se encontró la orden o hubo un error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxWidth={900} mx="auto" mt={4}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom fontWeight={700}>Buscar Orden por N° de Lote</Typography>
                <Box display="flex" gap={2} mb={2}>
                    <TextField label="N° de Lote" value={lote} onChange={e => setLote(e.target.value)} size="small" />
                    <Button variant="contained" onClick={handleSearch} disabled={loading || !lote}>Buscar</Button>
                </Box>
                {error && <Typography color="error">{error}</Typography>}
                {data && (
                    <Box mt={3}>
                        {apartados.map(ap => {
                            const keys = getFieldsForApartado(ap, Object.keys(data)).filter(k => data[k] !== undefined && data[k] !== null);
                            return renderSection(ap.label, data, keys);
                        })}
                    </Box>
                )}
            </Paper>
        </Box>
    );
};
