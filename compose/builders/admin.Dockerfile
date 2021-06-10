FROM node:14.11-alpine
ENV PORT=3001
ENV NODE_ENV=production
EXPOSE $PORT
ARG MONOREPO_VERSION=main
COPY --from=greenpress/monorepo:${MONOREPO_VERSION} /apps/admin .
CMD npm start
