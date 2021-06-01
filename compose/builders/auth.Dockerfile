FROM node:14.11-alpine
ENV PORT=9000
ENV NODE_ENV=production
EXPOSE $PORT
COPY --from=greenpress/monorepo /apps/auth .
CMD npm start
