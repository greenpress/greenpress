ARG MONOREPO_VERSION=main
FROM greenpress/monorepo:${MONOREPO_VERSION} as base

FROM node:15.14-alpine
ENV NODE_ENV=production
ENV PORT=9002
EXPOSE $PORT
ADD --from=base /apps/secrets/greenpress-secrets.tgz .
WORKDIR /package
CMD npm start
