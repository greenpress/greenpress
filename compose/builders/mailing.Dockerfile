FROM node:14.5.0
ENV NODE_ENV=production
ENV PORT=9004
EXPOSE $PORT
COPY --from=greenpress/monorepo /apps/mailing .
CMD npm start