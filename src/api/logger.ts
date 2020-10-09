import winston from "winston";

const apiLogger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

export default apiLogger;
