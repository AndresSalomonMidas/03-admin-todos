# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```docker
docker compose up -d
```

2.RCrear una copia del .env.template y renombrarlo a .env
3.Reemplazar las variables de entorno
4.Ejecutar el comando ``` npm install ```
5.Ejecutar el comando ``` npm run dev ```
6.Ejecutar estos comandos de prisma

```node
npx prisma migrate dev
npx prisma generate
```

7.Ejecutar el SEED para [crear la base de datos local](http://localhost:3000/api/seed)

## Prisma

"dev" es el nombre de la migración para que Prisma se sincronice con la DB
generate es para crear el cliente de Prisma

# Production

# Staging
