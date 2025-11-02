FROM node:18-alpine AS build
WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci --silent || npm install --silent

COPY frontend/ ./
RUN npm run build -- --configuration production

FROM nginx:stable-alpine
# 👇 Angular te lo dejó en dist/frontend/browser
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
