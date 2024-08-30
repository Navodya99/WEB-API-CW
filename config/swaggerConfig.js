const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Train API",
      version: "1.0.0",
      description: "API documentation for Train management",
    },
    servers: [
      {
        url: "http://localhost:8090",
      },
    ],
    components: {
      schemas: {
        Train: {
          type: "object",
          properties: {
            trainName: {
              type: "string",
              description: "The unique identifier for the train",
            },
            name: {
              type: "string",
              description: "Name of the train",
            },
            line: {
              type: "string",
              description: "The line on which the train operates",
            },
            currentStation: {
              type: "object",
              properties: {
                stationId: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
              },
            },
            passedStations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  stationId: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                },
              },
            },
            lastPassedStation: {
              type: "string",
              description: "The last station that the train passed",
            },
            lastPassedTime: {
              type: "string",
              format: "date-time",
              description: "The last time the train passed a station",
            },
          },
        },
        Station: {
          type: "object",
          required: ["name", "line", "latitude", "longitude"],
          properties: {
            id: {
              type: "string",
              description: "The auto-generated ID of the station",
            },
            name: {
              type: "string",
              description: "The name of the station",
            },
            line: {
              type: "string",
              enum: [
                "Main Line",
                "Puttalam Line",
                "Coastal Line",
                "Kalaniwali Line",
              ],
              description: "The line on which the station is located",
            },
            latitude: {
              type: "number",
              description: "The latitude of the station",
            },
            longitude: {
              type: "number",
              description: "The longitude of the station",
            },
          },
        },
      },
    },
  },
  apis: ["./Routes/*.js"], // Adjust the path as needed
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
