FROM node:alpine3.17 AS build

ARG VERSION=1.0

WORKDIR /app

LABEL org.opencontainers.image.authors="Nischay Mamidi <NischayPro@protonmail.com>" \
      org.opencontainers.image.description="Docker image to build Volunteer Connection frontend" \
      org.opencontainers.image.documentation="https://github.com/Rounaknayee/frontend" \
      org.opencontainers.image.licenses="GPL v3.0" \
      org.opencontainers.image.source="https://github.com/Rounaknayee/frontend" \
      org.opencontainers.image.title="Volunteer Connection Frontend" \
      org.opencontainers.image.url="https://github.com/Rounaknayee/frontend" \
      org.opencontainers.image.version="${VERSION}"

COPY . .

RUN npm ci --only=production
RUN npm run build

FROM nginx:alpine

EXPOSE 80

COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html