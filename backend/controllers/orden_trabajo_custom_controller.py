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
            ot.id_orden_trabajo AS id_orden_trabajo,
            ot.cliente_id AS cliente_id,
            c.nombre AS cliente_nombre,
            ot.id_tipo_troquelado AS id_tipo_troquelado,
            t.nombre AS tipo_troquelado_nombre,
            ot.id_sistema AS id_sistema,
            s.nombre AS sistema_nombre,
            ot.id_etapa AS id_etapa,
            e.nombre AS etapa_nombre,
            ot.id_usuario AS id_usuario,
            u.nombre AS usuario_nombre,
            ot.numero_lote AS numero_lote,
            ot.fecha_creacion AS fecha_creacion,
            ot.estado_actual AS estado_actual,
            ot.soporte AS soporte,
            ot.alto_mm AS alto_mm,
            ot.ancho_mm AS ancho_mm,
            ot.z AS z,
            ot.desarrollo AS desarrollo,
            ot.alto_desarrollo AS alto_desarrollo,
            ot.metros AS metros,
            ot.demasia AS demasia,
            ot.cantidad_rollos AS cantidad_rollos,
            ot.banda AS banda,
            ot.lado AS lado,
            ot.sentido_bobina AS sentido_bobina,
            ot.cantidad_etiquetas AS cantidad_etiquetas,
            ot.observaciones AS observaciones,
            

            -- Control PrePrensa
            cpp.id_control_preprensa AS id_control_preprensa,
            cpp.id_usuario AS id_usuario_preprensa,
            ucppre.nombre AS usuario_preprensa_nombre,
            cpp.tipo_curvas AS tipo_curvas,
            cpp.banda_2mm_troq AS banda_2mm_troq,
            cpp.img_incrustadas AS img_incrustadas,
            cpp.circulo_en_banda AS circulo_en_banda,
            cpp.etiq_centrada AS etiq_centrada,
            cpp.todos_elementos_etiqueta AS todos_elementos_etiqueta,
            cpp.grosor_textos AS grosor_textos,
            cpp.guillotinado AS guillotinado,
            cpp.seg_color_textos_revertidos AS seg_color_textos_revertidos,
            cpp.polimero_barniz AS polimero_barniz,
            cpp.reduccion AS reduccion,
            cpp.eliminar_puntos_menos_5 AS eliminar_puntos_menos_5,
            cpp.trapping AS trapping,
            cpp.logo_zeus AS logo_zeus,
            cpp.observaciones AS observaciones_preprensa,

            -- Control Prensa
            cp.id_control_prensa AS id_control_prensa,
            cp.id_maquina AS id_maquina_prensa,
            m1.nombre AS maquina_prensa_nombre,
            cp.id_usuario AS id_usuario_prensa,
            ucp.nombre AS usuario_prensa_nombre,
            cp.polimeros AS polimeros,
            cp.textos AS textos,
            cp.color AS color,
            cp.registro AS registro,
            cp.resistencia_frote AS resistencia_frote,
            cp.medidas AS medidas,
            cp.liner AS liner,
            cp.metros_impresos AS metros_impresos,
            cp.cantidad_tinta AS cantidad_tinta,
            cp.cantidad_barniz AS cantidad_barniz,
            cp.bobina_1 AS bobina_1,
            cp.bobina_2 AS bobina_2,
            cp.bobina_3 AS bobina_3,
            cp.bobina_4 AS bobina_4,
            cp.bobina_5 AS bobina_5,
            cp.bobina_6 AS bobina_6,
            cp.bobina_7 AS bobina_7,
            cp.bobina_8 AS bobina_8,
            cp.bobina_9 AS bobina_9,
            cp.bobina_10 AS bobina_10,
            cp.bobina_11 AS bobina_11,
            cp.bobina_12 AS bobina_12,
            cp.bobina_13 AS bobina_13,
            cp.bobina_14 AS bobina_14,
            cp.bobina_15 AS bobina_15,
            cp.bobina_16 AS bobina_16,
            cp.bobina_17 AS bobina_17,
            cp.bobina_18 AS bobina_18,
            cp.observaciones AS observaciones_prensa,

            -- Control PostPrensa
            cppost.id_control_post_prensa AS id_control_post_prensa,
            cppost.id_maquina AS id_maquina_postprensa,
            m2.nombre AS maquina_postprensa_nombre,
            cppost.id_usuario AS id_usuario_postprensa,
            ucpp.nombre AS usuario_postprensa_nombre,
            cppost.stamping_color AS stamping_color,
            cppost.stamping_registro AS stamping_registro,
            cppost.medio_corte_medida AS medio_corte_medida,
            cppost.medio_corte_liner AS medio_corte_liner,
            cppost.relieve_registro AS relieve_registro,
            cppost.relieve_altura AS relieve_altura,
            cppost.relieve_liner AS relieve_liner,
            cppost.serigrafia_shablon_nro AS serigrafia_shablon_nro,
            cppost.serigrafia_volumen AS serigrafia_volumen,
            cppost.serigrafia_control_frote AS serigrafia_control_frote,
            cppost.serigrafia_registro AS serigrafia_registro,
            cppost.exam_impresion AS exam_impresion,
            cppost.exam_stamping AS exam_stamping,
            cppost.exam_relieve AS exam_relieve,
            cppost.exam_serigrafia AS exam_serigrafia,
            cppost.exam_troquelado AS exam_troquelado,
            cppost.exam_cantidad AS exam_cantidad,
            cppost.firma_stamping AS firma_stamping,
            cppost.firma_relieve AS firma_relieve,
            cppost.firma_serigrafia AS firma_serigrafia,
            cppost.firma_medio_corte AS firma_medio_corte,
            cppost.firma_examinadora AS firma_examinadora,
            cppost.observaciones AS observaciones_postprensa,

            -- Control Calidad Final
            ccf.id_control_calidad AS id_control_calidad,
            ccf.fecha_control AS fecha_control,
            ccf.aprobado AS aprobado,
            ccf.cantidad_inspeccionada AS cantidad_inspeccionada,
            ccf.cantidad_defectuosa AS cantidad_defectuosa,
            ccf.observaciones AS observaciones_calidad,
            ccf.id_usuario AS id_usuario_calidad,
            uccf.nombre AS usuario_calidad_nombre,

            -- Remito
            r.id_remito AS id_remito,
            r.numero_remito AS numero_remito,
            r.fecha_emision AS fecha_emision,
            r.cantidad_entregada AS cantidad_entregada,
            r.observaciones AS observaciones_remito,
            r.id_usuario AS id_usuario_remito,
            ur.nombre AS usuario_remito_nombre
        FROM "OrdenTrabajo" ot
        LEFT JOIN "Cliente" c ON ot.cliente_id = c.id_cliente
        LEFT JOIN "Troquelado" t ON ot.id_tipo_troquelado = t.id_troquelado
        LEFT JOIN "SistemaImpresion" s ON ot.id_sistema = s.id_sistema_impresion
        LEFT JOIN "Etapa" e ON ot.id_etapa = e.id_etapa
        LEFT JOIN "Usuario" u ON ot.id_usuario = u.id_usuario
        LEFT JOIN "ControlPrePrensa" cpp ON ot.id_orden_trabajo = cpp.id_orden_trabajo
        LEFT JOIN "Usuario" ucppre ON cpp.id_usuario = ucppre.id_usuario
        LEFT JOIN "ControlPrensa" cp ON ot.id_orden_trabajo = cp.id_orden_trabajo
        LEFT JOIN "Maquina" m1 ON cp.id_maquina = m1.id_maquina
        LEFT JOIN "Usuario" ucp ON cp.id_usuario = ucp.id_usuario
        LEFT JOIN "ControlPostPrensa" cppost ON ot.id_orden_trabajo = cppost.id_orden_trabajo
        LEFT JOIN "Maquina" m2 ON cppost.id_maquina = m2.id_maquina
        LEFT JOIN "Usuario" ucpp ON cppost.id_usuario = ucpp.id_usuario
        LEFT JOIN "ControlCalidadFinal" ccf ON ot.id_orden_trabajo = ccf.id_orden_trabajo
        LEFT JOIN "Usuario" uccf ON ccf.id_usuario = uccf.id_usuario
        LEFT JOIN "Remito" r ON ot.id_orden_trabajo = r.id_orden_trabajo
        LEFT JOIN "Usuario" ur ON r.id_usuario = ur.id_usuario
        WHERE TRIM(LOWER(ot.numero_lote)) = TRIM(LOWER(:numero_lote))
        LIMIT 1
    ''')
    result = await db.execute(query, {"numero_lote": numero_lote})
    row = result.mappings().first()
    if not row:
        raise HTTPException(status_code=404, detail="Orden de trabajo no encontrada")
    return row
