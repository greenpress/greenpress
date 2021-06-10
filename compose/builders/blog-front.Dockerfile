FROM node:14.11-alpine
ENV THEME=damal
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE $PORT
ARG MONOREPO_VERSION=main
COPY --from=greenpress/monorepo:${MONOREPO_VERSION} /apps/blog-front .
CMD npm start
