ARG MONOREPO_VERSION=main
FROM greenpress/monorepo:${MONOREPO_VERSION} as base
ARG SERVICE_NAME=front-ssr
RUN node tools/bundle-dependencies-polyfix ${SERVICE_NAME}
RUN npm run pack-package --- --scope=@greenpress/${SERVICE_NAME}
RUN npm run rename-pack --- --scope=@greenpress/${SERVICE_NAME}

FROM node:16.5-alpine
ENV PORT=3002
ENV NODE_ENV=production
EXPOSE $PORT
COPY --from=base /apps/front-ssr/greenpress-front-ssr.tgz .
RUN tar zxvf ./greenpress-front-ssr.tgz -C ./
WORKDIR /package
CMD npm start
