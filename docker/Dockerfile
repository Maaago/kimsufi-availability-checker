FROM oven/bun:latest

WORKDIR /code
COPY ./package.json .
COPY ./src ./src

RUN bun install

ENTRYPOINT [ "bun" ]
CMD [ "run", "prod" ]