FROM fluent/fluentd:v1.17.1-1.1
USER root

# Install necessary dependencies and the required Elasticsearch gem
# Install dependencies in Dockerfile
RUN apk add --no-cache --update --virtual .build-deps \
      sudo build-base ruby-dev && \
      gem install elasticsearch -v '7.13.0' --no-document && \
      gem install fluent-plugin-elasticsearch -v '4.0.0'  --no-document && \
      apk del .build-deps && \
      rm -rf /var/cache/apk/*


COPY ./conf/fluent.conf /fluentd/etc/
USER fluent
