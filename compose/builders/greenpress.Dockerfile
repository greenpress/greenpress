ARG MONOREPO_VERSION=main
FROM greenpress/monorepo:${MONOREPO_VERSION} as base

FROM node:15.14-alpine
ENV PORT=3000
ENV FRONT_THEME=classic
ENV NODE_ENV=production
EXPOSE $PORT
RUN npm i -g pm2@4.5.1
COPY --from=base /apps/greenpress/greenpress-greenpress.tgz .
RUN tar zxvf ./greenpress-greenpress.tgz -C ./
WORKDIR /package
RUN npm install @greenpress/pm2-launcher
CMD npm start
