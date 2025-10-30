-- Script para agregar ON DELETE CASCADE a las foreign keys que referencian OrdenTrabajo
-- Ejecutar este script en PostgreSQL para habilitar la eliminación en cascada

-- 1. ControlPrePrensa
ALTER TABLE "ControlPrePrensa" 
DROP CONSTRAINT IF EXISTS "ControlPrePrensa_id_orden_trabajo_fkey";

ALTER TABLE "ControlPrePrensa" 
ADD CONSTRAINT "ControlPrePrensa_id_orden_trabajo_fkey" 
FOREIGN KEY (id_orden_trabajo) 
REFERENCES "OrdenTrabajo"(id_orden_trabajo) 
ON DELETE CASCADE;

-- 2. ControlPrensa
ALTER TABLE "ControlPrensa" 
DROP CONSTRAINT IF EXISTS "ControlPrensa_id_orden_trabajo_fkey";

ALTER TABLE "ControlPrensa" 
ADD CONSTRAINT "ControlPrensa_id_orden_trabajo_fkey" 
FOREIGN KEY (id_orden_trabajo) 
REFERENCES "OrdenTrabajo"(id_orden_trabajo) 
ON DELETE CASCADE;

-- 3. ControlPostPrensa
ALTER TABLE "ControlPostPrensa" 
DROP CONSTRAINT IF EXISTS "ControlPostPrensa_id_orden_trabajo_fkey";

ALTER TABLE "ControlPostPrensa" 
ADD CONSTRAINT "ControlPostPrensa_id_orden_trabajo_fkey" 
FOREIGN KEY (id_orden_trabajo) 
REFERENCES "OrdenTrabajo"(id_orden_trabajo) 
ON DELETE CASCADE;

-- 4. ControlCalidadFinal
ALTER TABLE "ControlCalidadFinal" 
DROP CONSTRAINT IF EXISTS "ControlCalidadFinal_id_orden_trabajo_fkey";

ALTER TABLE "ControlCalidadFinal" 
ADD CONSTRAINT "ControlCalidadFinal_id_orden_trabajo_fkey" 
FOREIGN KEY (id_orden_trabajo) 
REFERENCES "OrdenTrabajo"(id_orden_trabajo) 
ON DELETE CASCADE;

-- 5. Archivo
ALTER TABLE "Archivo" 
DROP CONSTRAINT IF EXISTS "Archivo_orden_id_fkey";

ALTER TABLE "Archivo" 
ADD CONSTRAINT "Archivo_orden_id_fkey" 
FOREIGN KEY (orden_id) 
REFERENCES "OrdenTrabajo"(id_orden_trabajo) 
ON DELETE CASCADE;

-- 6. Remito
ALTER TABLE "Remito" 
DROP CONSTRAINT IF EXISTS "Remito_id_orden_trabajo_fkey";

ALTER TABLE "Remito" 
ADD CONSTRAINT "Remito_id_orden_trabajo_fkey" 
FOREIGN KEY (id_orden_trabajo) 
REFERENCES "OrdenTrabajo"(id_orden_trabajo) 
ON DELETE CASCADE;

-- Verificar las constraints actualizadas
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    rc.delete_rule
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
JOIN information_schema.referential_constraints AS rc
    ON rc.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND ccu.table_name = 'OrdenTrabajo'
ORDER BY tc.table_name;
