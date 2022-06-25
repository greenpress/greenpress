ARG MONOREPO_VERSION=main
FROM greenpress/monorepo:${MONOREPO_VERSION} as base

FROM node:16.15-alpine
ENV PORT=3002
ENV NODE_ENV=production
EXPOSE $PORT
COPY --from=base /apps/front-ssr/*.mjs /apps/front-ssr/*.json /apps/front-ssr/*.js /
RUN npm install
COPY --from=base /apps/front-ssr/client /client
WORKDIR /package
CMD npm start
