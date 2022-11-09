# Order Management System

Sample projects to demonstrate microservices, restful web api as well as ui.
The system consists of 3 following projects:
- Order Microservices
- Payment Microservices
- Order Web

## Running the app
Run command to copy environment variable for Payment Service and Order Web
```bash
cp payment-service/.env.example payment-service/.env
cp web/.env.example web/.env
```
Install Docker Desktop if you do not have it. Run docker package using docker-compose command

```bash
# docker
$ docker-compose up #--build 
```

Then browse http://localhost:3000

Web Api can be checked through http://localhost:3001/api/orders and you can access api documentation through http://localhost:3001/api-docs

