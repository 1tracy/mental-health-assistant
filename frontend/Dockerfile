FROM node:10.15.2-alpine
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json /frontend/package.json
RUN npm install

COPY . /frontend

ENTRYPOINT ["npm", "start"]
