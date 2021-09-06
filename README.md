# pharmX

## Description:

​	This project's goal is going to build a platform for pharmacy end.

### Start backend 

```bash
docker-compose up --build -d <service_name>
```

### Start frontend

```bash
docker build -t sample:dev .  # rebuild image
```

```bash
docker run \ 
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    sample:dev
```

