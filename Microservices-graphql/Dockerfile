# Usa una versión específica de Ruby compatible
FROM ruby:3.1.2-alpine

# Instala dependencias del sistema
RUN apk add --no-cache build-base libstdc++ sqlite-libs nodejs npm tzdata git

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY Gemfile Gemfile.lock ./

# Instala las gemas sin incluir grupos de desarrollo y test
RUN bundle install --without development test

# Copia el código fuente de la aplicación
COPY . .

# Expone el puerto 3000 de Rails
EXPOSE 3000

# Comando por defecto para iniciar Rails
CMD ["rails", "server", "-b", "0.0.0.0"]

