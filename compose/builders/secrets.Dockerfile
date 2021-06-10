ARG MONOREPO_VERSION=main
FROM greenpress/monorepo:${MONOREPO_VERSION} as base

FROM node:14.11-alpine
ENV NODE_ENV=production
ENV PORT=9002
EXPOSE $PORT
COPY --from=base /apps/secrets .
CMD npm start
