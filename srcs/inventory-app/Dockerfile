FROM node:18.16 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .


FROM node:18.16-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 8080

CMD ["npm", "start"]
