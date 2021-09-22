ARG MONOREPO_VERSION=main
FROM greenpress/monorepo:${MONOREPO_VERSION} as base

FROM node:15.14-alpine
ENV PORT=9000
ENV NODE_ENV=production
EXPOSE $PORT
ADD --from=base /apps/auth/greenpress-auth.tgz .
WORKDIR /package
CMD npm start
