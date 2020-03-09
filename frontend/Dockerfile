FROM node:13.7.0
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm cache verify
RUN npm install -g npm
RUN npm install
RUN npm install jquery typescript eslint-plugin-flowtype@3 popper.js
RUN npm audit fix
COPY . ./
#ARG REACT_APP_API_BASE_URL
#ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
EXPOSE 3000
CMD npm run start