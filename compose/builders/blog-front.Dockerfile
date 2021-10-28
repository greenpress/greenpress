ARG MONOREPO_VERSION=main
FROM greenpress/monorepo:${MONOREPO_VERSION} as base
ENV THEME=damal
ARG SERVICE_NAME=blog-front
RUN lerna exec npm run build --scope=@greenpress/${SERVICE_NAME}
RUN node tools/bundle-dependencies-polyfix ${SERVICE_NAME}
RUN npm run pack-package --- --scope=@greenpress/${SERVICE_NAME}
RUN npm run rename-pack --- --scope=@greenpress/${SERVICE_NAME}

FROM node:15.14-alpine
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE $PORT
RUN npm i -g cross-env
COPY --from=base /apps/blog-front/greenpress-blog-front.tgz .
RUN tar zxvf ./greenpress-blog-front.tgz -C ./
COPY --from=base /apps/blog-front/.nuxt ./package/.nuxt
COPY --from=base /apps/blog-front/.current_theme ./package/.current_theme
WORKDIR /package
CMD npm start
