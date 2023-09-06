import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAPI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.send("Hello");
});
const generateImage= async (prompt)=>{
const airesponse = await openai.createImage({
  prompt:prompt,
  n:1,
  size:"1024x1024",
  response_format: "b64_json"
})
return airesponse;
}
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
   const aiResponse = generateImage(prompt)
   console.log(aiResponse)
    // const aiResponse = await openai.createImage({
    //   prompt: prompt,
    //   n: 1,
    //   size: "1024x1024",
      
    // });
    // console.log(aiResponse)
    // console.log(response.data.data[0].url)
    const image = aiResponse.data.data[0].b64_json
    res.status(200).json({photo: image})
  } catch (error) {
    if (error.response) {
      console.log("Avatar error status: ", error.response.status);
      console.log("Avatar error data: ", error.response.data);
    } else {
      console.log("Avatar error message: ", error.message);
    }
    res.status(500).send(error?.response?.data.error.message)
  }
});
export default router;
