FROM node:14.5.0
ENV NODE_ENV=production
ENV PORT=9005
EXPOSE $PORT
COPY --from=greenpress/monorepo /apps/drafts .
CMD npm start