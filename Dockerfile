FROM node:16.5
COPY . .
ENV NODE_ENV=development
RUN npm install --unsafe-perm
RUN npm run build

RUN npm run clean
ENV NODE_ENV=production
RUN npm run install:prod-only
