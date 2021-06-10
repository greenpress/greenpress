FROM node:14.11-alpine
ENV PORT=3000
ENV FRONT_THEME=classic
ENV NODE_ENV=production
EXPOSE $PORT
ARG MONOREPO_VERSION=main
COPY --from=greenpress/monorepo:${MONOREPO_VERSION} /apps/greenpress .
CMD npm start
