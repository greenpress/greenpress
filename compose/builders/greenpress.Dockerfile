ARG MONOREPO_VERSION=main
FROM greenpress/monorepo:${MONOREPO_VERSION} as base

FROM node:15.14-alpine
ENV PORT=3000
ENV FRONT_THEME=classic
ENV NODE_ENV=production
EXPOSE $PORT
COPY --from=base /apps/greenpress .
CMD npm start
