FROM node:16.17.1 as build

RUN npm install -g npm@8.19.2

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD yarn start

# prepare nginx
# FROM nginx:1.19.8-alpine

# COPY --from=build /app/build /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# ENTRYPOINT ["nginx","-g","daemon off;"]
