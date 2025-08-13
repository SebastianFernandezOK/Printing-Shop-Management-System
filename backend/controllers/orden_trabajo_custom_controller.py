from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from backend.core.config import get_db
from sqlalchemy import text

router = APIRouter(prefix="/ordenes_trabajo_custom", tags=["ordenes_trabajo_custom"])

@router.get("/by_lote/{numero_lote}")
async def get_orden_trabajo_by_lote(numero_lote: str, db: AsyncSession = Depends(get_db)):
    query = text('''
        SELECT 
            -- Orden de Trabajo
            ot.id_orden_trabajo AS ot_id_orden_trabajo,
            ot.numero_lote AS ot_numero_lote,
            ot.fecha_creacion AS ot_fecha_creacion,
            ot.estado_actual AS ot_estado_actual,
            ot.soporte AS ot_soporte,
            ot.alto_mm AS ot_alto_mm,
            ot.ancho_mm AS ot_ancho_mm,
            ot.z AS ot_z,
            ot.desarrollo AS ot_desarrollo,
            ot.alto_desarrollo AS ot_alto_desarrollo,
            ot.metros AS ot_metros,
            ot.demasia AS ot_demasia,
            ot.cantidad_rollos AS ot_cantidad_rollos,
            ot.banda AS ot_banda,
            ot.lado AS ot_lado,
            ot.sentido_bobina AS ot_sentido_bobina,
            ot.cantidad_etiquetas AS ot_cantidad_etiquetas,
            ot.observaciones AS ot_observaciones,

            -- Control PrePrensa
            cpp.id_control_preprensa AS cppr_id_control_preprensa,
            cpp.id_usuario AS cppr_id_usuario,
            cpp.tipo_curvas AS cppr_tipo_curvas,
            cpp.banda_2mm_troq AS cppr_banda_2mm_troq,
            cpp.img_incrustadas AS cppr_img_incrustadas,
            cpp.circulo_en_banda AS cppr_circulo_en_banda,
            cpp.etiq_centrada AS cppr_etiq_centrada,
            cpp.todos_elementos_etiqueta AS cppr_todos_elementos_etiqueta,
            cpp.grosor_textos AS cppr_grosor_textos,
            cpp.guillotinado AS cppr_guillotinado,
            cpp.seg_color_textos_revertidos AS cppr_seg_color_textos_revertidos,
            cpp.polimero_barniz AS cppr_polimero_barniz,
            cpp.reduccion AS cppr_reduccion,
            cpp.eliminar_puntos_menos_5 AS cppr_eliminar_puntos_menos_5,
            cpp.trapping AS cppr_trapping,
            cpp.logo_zeus AS cppr_logo_zeus,
            cpp.observaciones AS cppr_observaciones,

            -- Control Prensa
            cp.id_control_prensa AS cpr_id_control_prensa,
            cp.id_maquina AS cpr_id_maquina,
            cp.id_usuario AS cpr_id_usuario,
            cp.polimeros AS cpr_polimeros,
            cp.textos AS cpr_textos,
            cp.color AS cpr_color,
            cp.registro AS cpr_registro,
            cp.resistencia_frote AS cpr_resistencia_frote,
            cp.medidas AS cpr_medidas,
            cp.liner AS cpr_liner,
            cp.metros_impresos AS cpr_metros_impresos,
            cp.cantidad_tinta AS cpr_cantidad_tinta,
            cp.cantidad_barniz AS cpr_cantidad_barniz,
            cp.bobina_1 AS cpr_bobina_1,
            cp.bobina_2 AS cpr_bobina_2,
            cp.bobina_3 AS cpr_bobina_3,
            cp.bobina_4 AS cpr_bobina_4,
            cp.bobina_5 AS cpr_bobina_5,
            cp.bobina_6 AS cpr_bobina_6,
            cp.bobina_7 AS cpr_bobina_7,
            cp.bobina_8 AS cpr_bobina_8,
            cp.bobina_9 AS cpr_bobina_9,
            cp.bobina_10 AS cpr_bobina_10,
            cp.bobina_11 AS cpr_bobina_11,
            cp.bobina_12 AS cpr_bobina_12,
            cp.bobina_13 AS cpr_bobina_13,
            cp.bobina_14 AS cpr_bobina_14,
            cp.bobina_15 AS cpr_bobina_15,
            cp.bobina_16 AS cpr_bobina_16,
            cp.bobina_17 AS cpr_bobina_17,
            cp.bobina_18 AS cpr_bobina_18,
            cp.observaciones AS cpr_observaciones,

            -- Control PostPrensa
            cppost.id_control_post_prensa AS cpp_id_control_post_prensa,
            cppost.id_maquina AS cpp_id_maquina,
            cppost.id_usuario AS cpp_id_usuario,
            cppost.stamping_color AS cpp_id_stamping_color,
            cppost.stamping_registro AS cpp_id_stamping_registro,
            cppost.medio_corte_medida AS cpp_id_medio_corte_medida,
            cppost.medio_corte_liner AS cpp_id_medio_corte_liner,
            cppost.relieve_registro AS cpp_id_relieve_registro,
            cppost.relieve_altura AS cpp_id_relieve_altura,
            cppost.relieve_liner AS cpp_id_relieve_liner,
            cppost.serigrafia_shablon_nro AS cpp_id_serigrafia_shablon_nro,
            cppost.serigrafia_volumen AS cpp_id_serigrafia_volumen,
            cppost.serigrafia_control_frote AS cpp_id_serigrafia_control_frote,
            cppost.serigrafia_registro AS cpp_id_serigrafia_registro,
            cppost.exam_impresion AS cpp_id_exam_impresion,
            cppost.exam_stamping AS cpp_id_exam_stamping,
            cppost.exam_relieve AS cpp_id_exam_relieve,
            cppost.exam_serigrafia AS cpp_id_exam_serigrafia,
            cppost.exam_troquelado AS cpp_id_exam_troquelado,
            cppost.exam_cantidad AS cpp_id_exam_cantidad,
            cppost.firma_stamping AS cpp_id_firma_stamping,
            cppost.firma_relieve AS cpp_id_firma_relieve,
            cppost.firma_serigrafia AS cpp_id_firma_serigrafia,
            cppost.firma_medio_corte AS cpp_id_firma_medio_corte,
            cppost.firma_examinadora AS cpp_id_firma_examinadora,
            cppost.observaciones AS cpp_id_observaciones,

            -- Control Calidad Final
            ccf.id_control_calidad AS ccf_id_control_calidad,
            ccf.fecha_control AS ccf_fecha_control,
            ccf.aprobado AS ccf_aprobado,
            ccf.cantidad_inspeccionada AS ccf_cantidad_inspeccionada,
            ccf.cantidad_defectuosa AS ccf_cantidad_defectuosa,
            ccf.observaciones AS ccf_observaciones,
            ccf.id_usuario AS ccf_id_usuario,

            -- Remito
            r.id_remito AS r_id_remito,
            r.numero_remito AS r_numero_remito,
            r.fecha_emision AS r_fecha_emision,
            r.cantidad_entregada AS r_cantidad_entregada,
            r.observaciones AS r_observaciones,
            r.id_usuario AS r_id_usuario
        FROM "OrdenTrabajo" ot
        LEFT JOIN "ControlPrePrensa" cpp ON ot.id_orden_trabajo = cpp.id_orden_trabajo
        LEFT JOIN "ControlPrensa" cp ON ot.id_orden_trabajo = cp.id_orden_trabajo
        LEFT JOIN "ControlPostPrensa" cppost ON ot.id_orden_trabajo = cppost.id_orden_trabajo
        LEFT JOIN "ControlCalidadFinal" ccf ON ot.id_orden_trabajo = ccf.id_orden_trabajo
        LEFT JOIN "Remito" r ON ot.id_orden_trabajo = r.id_orden_trabajo
        WHERE TRIM(LOWER(ot.numero_lote)) = TRIM(LOWER(:numero_lote))
        LIMIT 1
    ''')
    result = await db.execute(query, {"numero_lote": numero_lote})
    row = result.mappings().first()
    if not row:
        raise HTTPException(status_code=404, detail="Orden de trabajo no encontrada")
    return row
