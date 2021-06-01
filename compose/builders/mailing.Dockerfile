FROM node:14.11-alpine
ENV NODE_ENV=production
ENV PORT=9004
EXPOSE $PORT
COPY --from=greenpress/monorepo /apps/mailing .
CMD npm start