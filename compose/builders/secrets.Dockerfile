FROM node:13.3.0
ENV NODE_ENV=production
ENV PORT=9002
EXPOSE $PORT
COPY --from=greenpress/monorepo /apps/secrets .
CMD npm start