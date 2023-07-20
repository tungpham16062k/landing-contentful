FROM mhart/alpine-node:14

WORKDIR /var/www/app

EXPOSE 3000

RUN adduser -h "/home/vihatcrm" -u 2000 -D -s /bin/false "vihatcrm" \
    && apk add --update ca-certificates tzdata \
    && cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime \
    && echo echo "Asia/Ho_Chi_Minh" > /etc/timezone \
    && apk del tzdata \
    && rm -rf /var/cache/apk/* \
    && mkdir /etc-extra \
    && touch /etc-extra/hosts

COPY package.json yarn.lock /var/www/app/

RUN yarn install --production --ignore-scripts --prefer-offline

COPY . /var/www/app/

# use line below when need to update libs
# RUN yarn run build && yarn cache clean
RUN yarn run build

# Install app dependencies

CMD [ "yarn", "start" ]