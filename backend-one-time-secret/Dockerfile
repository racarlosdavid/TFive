FROM node:16-alpine
WORKDIR /backendOneTimeSecret
COPY . .
RUN npm install  
ENV HOST default 
EXPOSE 2000
CMD ["npm","start"]