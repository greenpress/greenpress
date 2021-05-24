
FROM node:14.5.0
RUN mkdir /app
WORKDIR /app
COPY . .
ENV NODE_ENV=production
RUN npm install
ENV PORT=9004
EXPOSE $PORT
CMD npm start
