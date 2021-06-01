FROM node:14.11-alpine
ENV PORT=3000
ENV FRONT_THEME=classic
ENV NODE_ENV=production
EXPOSE $PORT
COPY --from=greenpress/monorepo /apps/greenpress .
CMD npm start