FROM node:14.11-alpine
ENV NODE_ENV=production
ENV PORT=9002
EXPOSE $PORT
ARG MONOREPO_VERSION=main
COPY --from=greenpress/monorepo:${MONOREPO_VERSION} /apps/secrets .
CMD npm start
