FROM node:12-alpine
WORKDIR /src/app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 9999
CMD ["npm", "start"]