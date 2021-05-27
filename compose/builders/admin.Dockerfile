FROM node:14.11-alpine
ENV PORT=3001
ENV NODE_ENV=production
EXPOSE $PORT
COPY --from=greenpress/monorepo /apps/admin .
CMD npm start
