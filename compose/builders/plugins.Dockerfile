ARG MONOREPO_VERSION=main
FROM greenpress/monorepo:${MONOREPO_VERSION} as base
ARG SERVICE_NAME=plugins
RUN node tools/bundle-dependencies-polyfix ${SERVICE_NAME}
RUN npm run pack-package --- --scope=@greenpress/${SERVICE_NAME}
RUN npm run rename-pack --- --scope=@greenpress/${SERVICE_NAME}

FROM node:16.5-alpine
ENV NODE_ENV=production
ENV PORT=9006
EXPOSE $PORT
COPY --from=base /apps/plugins/greenpress-plugins.tgz .
RUN tar zxvf ./greenpress-plugins.tgz -C ./
WORKDIR /package
CMD npm start
