FROM node:15.14
COPY . .
ENV NODE_ENV=development
RUN npm install --unsafe-perm
RUN npm run build

RUN npm run clean
ENV NODE_ENV=production
RUN npm run install:prod-only
RUN npm run install:pack-all
