#Base Image node:8.12.0 on alpine
FROM node:10.19.0-alpine

WORKDIR vin-service-mock

#Copy required code
COPY . .

ENTRYPOINT node index.js
