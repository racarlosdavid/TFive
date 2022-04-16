FROM node:16-alpine
WORKDIR /backendUrlShortener
COPY . .
RUN npm install 
ENV HOST default   
EXPOSE 3001
CMD ["npm","start"]