FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json tsconfig.json ./
COPY prisma ./prisma
RUN npm install
COPY src ./src
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY --from=builder /usr/src/app/dist ./dist
RUN npm install --production
EXPOSE 4000
CMD ["node", "dist/server.js"]
