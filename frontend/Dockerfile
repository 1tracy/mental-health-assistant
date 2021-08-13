FROM node:14-alpine
RUN mkdir /frontend
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
COPY package.json /frontend/package.json
RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
