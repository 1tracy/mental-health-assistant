FROM node:14-alpine
RUN mkdir /frontend
WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
