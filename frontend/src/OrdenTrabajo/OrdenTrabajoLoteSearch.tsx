import { useState } from 'react';
import { TextField, Button, Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/HighlightOff';

const apartados = [
    { label: 'Orden de Trabajo', prefix: ['ot_'] },
    { label: 'Control PrePrensa', prefix: ['cppr_'] },
    { label: 'Control Prensa', prefix: ['cpr_'] },
    { label: 'Control PostPrensa', prefix: ['cpp_id_'] },
    { label: 'Control Calidad Final', prefix: ['ccf_'] },
    { label: 'Remito', prefix: ['r_'] },
];

const fieldLabels: Record<string, string> = {
    id_orden_trabajo: 'ID Orden de Trabajo',
    numero_lote: 'N° Lote',
    fecha_creacion: 'Fecha de Creación',
    estado_actual: 'Estado',
    soporte: 'Soporte',
    alto_mm: 'Alto (mm)',
    ancho_mm: 'Ancho (mm)',
    cantidad_etiquetas: 'Cantidad de Etiquetas',
    observaciones: 'Observaciones',
    // ... puedes agregar más nombres legibles aquí si lo deseas ...
};

function beautifyValue(val: any) {
    if (typeof val === 'boolean') {
        return val ? <CheckIcon color="success" fontSize="small" /> : <CloseIcon color="error" fontSize="small" />;
    }
    if (typeof val === 'string' && val.length > 60) {
        return <span style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{val}</span>;
    }
    if (val instanceof Date || (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}/.test(val))) {
        // Formato fecha
        return new Date(val).toLocaleString();
    }
    return String(val);
}

function getFieldsForApartado(apartado, dataKeys) {
    return dataKeys.filter(k => apartado.prefix.some(pref => k.startsWith(pref)));
}

function renderSection(label: string, data: any, keys: string[]) {
    if (keys.length === 0) return null;
    return (
        <Box mb={3}>
            <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>{label}</Typography>
            <TableContainer component={Paper} sx={{ mb: 1, boxShadow: 1 }}>
                <Table size="small">
                    <TableBody>
                        {keys.map(f => (
                            <TableRow key={f}>
                                <TableCell sx={{ fontWeight: 600, width: 220 }}>{fieldLabels[f] || f.replace(/^\w+_/, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</TableCell>
                                <TableCell>{beautifyValue(data[f])}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
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
                        {/* Otros datos sueltos */}
                        {(() => {
                            const allKeys = Object.keys(data);
                            const usedKeys = apartados.flatMap(ap => getFieldsForApartado(ap, allKeys));
                            const otros = allKeys.filter(k => !usedKeys.includes(k) && data[k] !== undefined && data[k] !== null);
                            return renderSection('Otros datos', data, otros);
                        })()}
                    </Box>
                )}
            </Paper>
        </Box>
    );
};
