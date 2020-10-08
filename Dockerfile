FROM node:14.5.0
ENV PORT=3000
ENV FRONT_THEME=classic
EXPOSE $PORT
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
CMD npm start
