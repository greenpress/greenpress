FROM node:14.11-alpine
ENV PORT=9000
ENV NODE_ENV=production
EXPOSE $PORT
ARG MONOREPO_VERSION=main
COPY --from=greenpress/monorepo:$MONOREPO_VERSION /apps/auth .
CMD npm start
