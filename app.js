const router = require("./routes/routes");
const crimeRepository = require("./models/crime");
const express = require("express");
const cors = require("cors");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const client = require("./service/dbservice");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Guard",
      version: "1.0.0",
      description: "Crimes API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());

app.listen(3000, async () => {
  await client.connect();
  crimeRepository.init();
  console.log(`Server is running on http://localhost:${3000}`);
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", router);
