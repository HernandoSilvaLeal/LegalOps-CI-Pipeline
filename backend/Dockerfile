# Usa una imagen oficial de Node.js como base
FROM node:20.14.0

# Configura el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de package y package-lock para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación escucha (puerto 3000 como ejemplo)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
