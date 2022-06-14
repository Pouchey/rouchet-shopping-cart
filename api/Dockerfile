FROM node:latest
RUN mkdir /api
WORKDIR /api
COPY package.json /api
RUN npm install
COPY . /api
EXPOSE 5050
CMD npm run start