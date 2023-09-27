# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el SEED para [crear la base de datos local](http://localhost:3000/api/seed)

## Prisma

"dev" es el nombre de la migración para que Prisma se sincronice con la DB
generate es para crear el cliente de Prisma

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Production

# Staging
