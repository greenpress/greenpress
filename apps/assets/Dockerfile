FROM node:14.5.0
RUN mkdir /app
WORKDIR /app
ENV PORT=9003
EXPOSE $PORT
COPY . .
ENV NODE_ENV=production
RUN npm install
CMD npm start
