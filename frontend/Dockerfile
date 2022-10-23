FROM node:16-alpine
WORKDIR "/usr/src/app"
COPY package.json ./
RUN npm install --force
# 아래 copy바꿔야함
COPY ./ ./
CMD ["npm","run","start"]