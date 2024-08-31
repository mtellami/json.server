FROM node:latest

RUN npm i

CMD ["npm", "run", "start"]
