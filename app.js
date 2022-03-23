const router = require("./routes/routes");
const crimeRepository = require("./models/crime");
const express = require("express");
const cors = require("cors");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const client = require("./service/dbservice");
const options = require("./swagger-config.json");
const specs = swaggerJsDoc(options);
const morgan = require('morgan');
const winston = require('./config/winston');

app.use(morgan('combined', { stream: winston.stream }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await client.connect();
  crimeRepository.init();  
  console.log(`Server is running on http://localhost:${PORT}`);
})

app.use("/", router);
