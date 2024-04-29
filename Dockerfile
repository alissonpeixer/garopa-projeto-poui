FROM node:latest as builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install -g @angular/cli@latest
RUN npm install
COPY . .
RUN ng build --output-path=dist/portal --configuration=production


FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/portal/browser .


COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
