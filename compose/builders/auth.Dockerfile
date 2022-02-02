ARG MONOREPO_VERSION=main
FROM greenpress/monorepo:${MONOREPO_VERSION} as base
ARG SERVICE_NAME=auth
RUN node tools/bundle-dependencies-polyfix ${SERVICE_NAME}
RUN npm run pack-package --- --scope=@greenpress/${SERVICE_NAME}
RUN npm run rename-pack --- --scope=@greenpress/${SERVICE_NAME}

FROM node:16.5-alpine
ENV PORT=9000
ENV NODE_ENV=production
EXPOSE $PORT
COPY --from=base /apps/auth/greenpress-auth.tgz .
RUN tar zxvf ./greenpress-auth.tgz -C ./
WORKDIR /package
CMD npm start
