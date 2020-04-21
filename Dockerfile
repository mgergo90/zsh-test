# ------------------------- BASE ENVIRONMENT ---------------------------------
FROM node:stretch-slim as base

WORKDIR /srv/app

ARG UID=1000
ARG GID=1000

CMD [ "yarn", "start:production" ]

# ------------------------- DEVELOPMENT ENVIRONMENT ---------------------------------

FROM base as dev
RUN apt update -yq \
        && apt install make libssl-dev libghc-zlib-dev libcurl4-gnutls-dev libexpat1-dev gettext unzip wget -y \
        && cd /usr/src/ \
        && wget https://github.com/git/git/archive/v2.23.0.zip -O git.zip \
        && unzip git.zip \
        && cd git-* \
        && make prefix=/usr/local all \
        && make prefix=/usr/local install;

CMD [ "yarn", "start" ]
