# Construcción de la app con Node.js
FROM node:18-alpine AS build

# Definir el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias e instalar
COPY client/package.json client/package-lock.json ./
RUN npm install --frozen-lockfile

# Copiar el código fuente
COPY client ./

# Construir la aplicación
RUN npm run build

# ------------------- #
# Servir la app con un servidor ligero como nginx
FROM nginx:alpine

# Definir el directorio de trabajo
WORKDIR /usr/share/nginx/html

# Copiar los archivos compilados desde la fase de construcción
COPY --from=build /app/dist ./

# Exponer el puerto 80 para servir la aplicación
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
