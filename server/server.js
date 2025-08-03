import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
//const openai = new OpenAI(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from ChatGPT!" });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      // temperature: 0,
      // max_tokens: 3000,
      // top_p: 1,
      // frequency_penalty: 0.5,
      // presence_penalty: 0,
    });

    console.log("Response: ", response);

    res.status(200).send({
      bot: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong" });
  }
});

app.listen(5000, () =>
  console.log("Server is running on port http://localhost:5000"),
);
