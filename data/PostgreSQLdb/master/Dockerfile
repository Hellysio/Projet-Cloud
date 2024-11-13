FROM postgres:14.13

WORKDIR /app

ENV POSTGRES_DB=DescriptionDB
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=postgres

COPY /master.sh /app/master.sh
RUN chmod +x /app/master.sh


EXPOSE 5432

