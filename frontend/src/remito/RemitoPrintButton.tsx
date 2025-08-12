import { useRecordContext } from 'react-admin';
import { Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import React from 'react';

export const RemitoPrintButton = () => {
    const record = useRecordContext();
    if (!record) return null;

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;
        printWindow.document.write(`
            <html>
            <head>
                <title>Remito N° ${record.numero_remito}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    h2 { margin-bottom: 24px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
                    td { padding: 8px; border-bottom: 1px solid #ccc; }
                    .label { font-weight: bold; width: 200px; }
                </style>
            </head>
            <body>
                <h2>Remito N° ${record.numero_remito}</h2>
                <table>
                    <tr><td class="label">Orden de Trabajo</td><td>${record.id_orden_trabajo}</td></tr>
                    <tr><td class="label">Fecha Emisión</td><td>${record.fecha_emision ? new Date(record.fecha_emision).toLocaleString() : ''}</td></tr>
                    <tr><td class="label">Cantidad Entregada</td><td>${record.cantidad_entregada}</td></tr>
                    <tr><td class="label">Observaciones</td><td>${record.observaciones || ''}</td></tr>
                    <tr><td class="label">Usuario</td><td>${record.id_usuario}</td></tr>
                </table>
                <div style="margin-top:40px;">Firma: ___________________________</div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint} sx={{ ml: 2 }}>
            Imprimir Remito
        </Button>
    );
};
