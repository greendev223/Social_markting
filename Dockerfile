FROM node:14-alpine
WORKDIR /var/app
COPY ./package*.json ./
RUN yarn
COPY . .
ENV NODE_ENV production
RUN yarn build

FROM nginx:stable-alpine
COPY --from=0 /var/app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80