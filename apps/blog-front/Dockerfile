FROM node:14.5.0 AS builder
ENV THEME=damal
COPY . .
RUN export NODE_ENV=development && npm install

FROM builder
ENV PORT=3000
EXPOSE $PORT
ENV THEME=damal
COPY --from=builder . .
CMD export NODE_ENV=production && npm start
