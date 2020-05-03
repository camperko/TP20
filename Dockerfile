FROM postgres
COPY ./backend/blockchainexport.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_DB blockchain
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV PGPASSWORD postgres