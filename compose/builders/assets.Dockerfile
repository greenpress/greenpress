FROM node:14.5.0
ENV PORT=9003
ENV NODE_ENV=production
EXPOSE $PORT
COPY --from=greenpress/monorepo /apps/assets .
CMD npm start
