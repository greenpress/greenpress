FROM node:14.11-alpine
ENV NODE_ENV=production
ENV PORT=9001
EXPOSE $PORT
COPY --from=greenpress/monorepo /apps/content .
CMD npm start