FROM node:18.15-slim

RUN apt update && apt install -y --no-install-recommends \
    git \
    ca-certificates \
    openssh-client

USER node

WORKDIR /home/node/app

CMD ["sh", "-c", "npm i && tail -f /dev/null"]

