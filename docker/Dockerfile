FROM oven/bun:latest

WORKDIR /code
COPY ./src .

RUN bun install

ENTRYPOINT [ "bun" ]
CMD [ "run" "prod" ]