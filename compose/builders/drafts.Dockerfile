FROM node:14.11-alpine
ENV NODE_ENV=production
ENV PORT=9005
EXPOSE $PORT
ARG MONOREPO_VERSION=main
COPY --from=greenpress/monorepo:$MONOREPO_VERSION /apps/drafts .
CMD npm start
