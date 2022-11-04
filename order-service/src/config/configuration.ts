export const configuration = () => ({
  payment: {
    host: process.env.PAYMENT_HOST,
    port: process.env.PAYMENT_PORT,
  },
  order: {
    host: process.env.ORDER_HOST,
    port: process.env.ORDER_PORT,
    portMicroservice: process.env.ORDER_PORT_MICROSERVICE,
  },
  database: {
    stringConnection: process.env.MONGO_DATABSE_CONNECTION_STRING,
    name: process.env.DATA_BASE_NAME,
  },
});
