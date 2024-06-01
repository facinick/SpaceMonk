everytime running yarn rw prisma migrate dev, 
if directUrl key is in schema.prisma:
  Error: Connection url is empty. See https://www.prisma.io/docs/reference/database-reference/connection-urls
if not, only url is there:
  #stuck at
  Environment variables loaded from .env
  Prisma schema loaded from api/db/schema.prisma
  Datasource "db": PostgreSQL database

Now, after commenting out directUrl key from schema, setting url=DATABASE_URL=driecturl value (5432 port) worked. Why? don't know. maybe because migrations to be run with session url and other connections with transaction? lets figure out.