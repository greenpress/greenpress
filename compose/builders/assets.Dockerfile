FROM node:14.11-alpine
ENV PORT=9003
ENV NODE_ENV=production
EXPOSE $PORT
COPY --from=greenpress/monorepo /apps/assets .
CMD npm start
