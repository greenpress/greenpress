ARG MONOREPO_VERSION=main
FROM greenpress/monorepo:${MONOREPO_VERSION} as base

FROM node:16.5-alpine
ENV PORT=3002
ENV NODE_ENV=production
EXPOSE $PORT
COPY --from=base /apps/front-ssr .
RUN npm install
RUN npm run build
WORKDIR /package
CMD npm start
