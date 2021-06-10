FROM node:14.11-alpine
ENV NODE_ENV=production
ENV PORT=9004
EXPOSE $PORT
ARG MONOREPO_VERSION=main
COPY --from=greenpress/monorepo:${MONOREPO_VERSION} /apps/mailing .
CMD npm start
