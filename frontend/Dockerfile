FROM node:12-alpine as dev

WORKDIR /src

COPY package.json yarn.lock ./
RUN yarn install
COPY . .

RUN yarn build

FROM nginxinc/nginx-unprivileged
COPY --from=dev /src/dist /usr/share/nginx/html
EXPOSE 8080
