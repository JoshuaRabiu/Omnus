FROM node:10.1.0
WORKDIR /app
COPY . .
WORKDIR ./ai-unit
RUN yarn add react-scripts && yarn --production=false && yarn run build
WORKDIR ../app
RUN yarn
EXPOSE 3001
CMD yarn start