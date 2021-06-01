FROM node:14.11-alpine
ENV NODE_ENV=production
ENV PORT=9002
EXPOSE $PORT
COPY --from=greenpress/monorepo /apps/secrets .
CMD npm start