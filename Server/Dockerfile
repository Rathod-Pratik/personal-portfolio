FROM node:21-alpine

WORKDIR /app

copy package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
