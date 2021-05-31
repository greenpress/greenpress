FROM node:14.5.0
ENV THEME=damal
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE $PORT
COPY --from=greenpress/monorepo /apps/blog-front .
CMD npm start
