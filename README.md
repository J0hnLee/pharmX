# pharmX

## Introduction:

​	This project's goal is going to build a platform for pharmacists, retail pharmacies, drug wholesale, and others. The system can deal with drug logistics, prescription issues, drug consultation. The first goal is going to make drug administration more fluent and efficient. The system can work on all platforms, the framework of the frontend is react with Antd which is enterprise-level React UI. Backend combines multi-service to ensure the robustness of the system. Include, Redis as cache. Prometheus and grafana for monitoring and alarm job. The database uses NoSQL database MongoDB and SQL database.

## Architecture Description:

![](images/prometheus-architecture.jpg)

![ ](images/Component diagram.jpeg)



## Module need to Integrate:

#### Frontend:

* React
* [Axios](https://bestofjs.org/projects/axios)-Promise based HTTP client for the browser and node.js

* [Hyperformula](HyperFormula)-HyperFormula is an open-source calculation engine that allows you to perform Excel-like calculations in your business applications. 
* Antd-UI
* Material-UI
*  [React-use](https://github.com/streamich/react-use) - react hook library
* [Echart](https://bestofjs.org/projects/echarts) -A powerful, interactive charting and data visualization library for browser

## Deploy the project:

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

