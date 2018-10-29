FROM node:8.9.0

WORKDIR /app

COPY . /app

RUN yarn install && \
    yarn build 

CMD [ "yarn" , "serve" ]
