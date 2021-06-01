FROM node:14.11-alpine
ENV NODE_ENV=production
ENV PORT=9005
EXPOSE $PORT
COPY --from=greenpress/monorepo /apps/drafts .
CMD npm start