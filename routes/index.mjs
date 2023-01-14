import { default as express, json } from "express";
import axios from 'axios';
export const router = express.Router();

const todo = {
  id: 1,
  task: "Get the milk",
};

const getSuperHerors = async () => {
  try {
    const TOKEN = process.env.SUPER_HERO_TOKEN;
    const response = await axios.get(
      `https://superheroapi.com/api/${TOKEN}/1/powerstats`,{"Content-Type`": "application/json"}
    );
    // if (!response.ok) {
    //   throw new Error("Something went wrong!");
    // }

    // const data = await response.json();
    return response.data;
  } catch (error) {
    return (error.message);
  }
};

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const data = await getSuperHerors();
    res.send(data);
  
  } catch (err) {
    next(err);
  }
});
