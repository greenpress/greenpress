
FROM node:14.11 AS nodeNpm
ENV NODE_ENV=development
COPY package.json package-lock.json ./
RUN npm install
COPY public ./public
COPY vite.config.js index.html ./
COPY src ./src
RUN npm run build
FROM node:14.11-alpine
WORKDIR /app
ENV PORT=3001
ENV NODE_ENV=production
EXPOSE $PORT
COPY --from=nodeNpm package.json package-lock.json ./
COPY server.js ./
COPY --from=nodeNpm /dist ./dist
RUN npm install
CMD npm start
