CREATE DATABASE recommendations;
CREATE USER recommendations SET PASSWORD "s3cr3t" SET PASSWORD CHANGE NOT REQUIRED;
CREATE ROLE recommendations;
GRANT ROLE recommendations TO recommendations;

GRANT ALL ON DATABASE recommendations TO recommendations;
GRANT TRAVERSE ON GRAPH recommendations TO recommendations;
GRANT WRITE ON GRAPH recommendations TO recommendations;

SHOW USER recommendations PRIVILEGES;

