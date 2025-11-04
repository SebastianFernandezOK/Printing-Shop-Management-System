# Etapa 1: Build de Angular
FROM node:18-alpine AS build
WORKDIR /app

# Instalar dependencias del sistema necesarias para compilar módulos nativos
RUN apk add --no-cache python3 make g++

# Copiar manifiestos y resolver dependencias
COPY frontend/package*.json ./
RUN npm ci --no-audit --no-fund || npm install

# Copiar el resto del código del frontend
COPY frontend/ ./

# Compilar en modo producción (usa environment.prod.ts)
RUN npm run build -- --configuration production

# Etapa 2: Nginx para servir los archivos estáticos
FROM nginx:stable-alpine

# Copiar el build final desde la etapa anterior
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html/

# (Opcional) Configurar tamaño máximo de subida
RUN echo "client_max_body_size 100M;" > /etc/nginx/conf.d/upload_limit.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
