FROM node as build

WORKDIR /frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend/ ./

RUN npm run build

FROM nginx:1.18.0-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend/build /usr/share/nginx/html
