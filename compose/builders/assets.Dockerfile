ARG MONOREPO_VERSION=main
FROM greenpress/monorepo:${MONOREPO_VERSION} as base

FROM node:15.14-alpine
ENV PORT=9003
ENV NODE_ENV=production
EXPOSE $PORT
COPY --from=base /apps/assets .
CMD npm start
