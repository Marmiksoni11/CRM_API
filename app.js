require("dotenv").config();
require("express-async-errors");

// extra security packages
const cors = require("cors");

const express = require("express");
const app = express();

const routes = require("./routes/index");
const sync_db = require("./sync")

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to MS_CRM</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          text-align: center;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
        }
        a {
          text-decoration: none;
          color: #007BFF;
          font-weight: bold;
        }
        .creators {
          margin-top: 20px;
          color: #555;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to MS_CRM</h1>
        <p><a href="/api-docs">Documentation</a></p>
        <div class="creators">
          <p><strong>Creators:</strong> Soni Marmik, Smit Trivedi</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// routes
app.use("/api/v1/", routes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    sync_db()
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(" Error starting the Server - > ", error);
  }
};

start();
