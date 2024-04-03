// src/index.js
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import sendEmail from "./emailService";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
// Enable CORS for all origins
app.use(cors());


app.post('/send-email', async (request, response) => {
  // Retrieve data from the request body sent by React client
  const { name, email, message } = request.body;

  try {
    await sendEmail(name, email, message);
    response.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    response.status(500).send('Error sending email');
  }
})

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server Andi mandi shandi');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});