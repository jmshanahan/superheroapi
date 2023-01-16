import { default as express, json } from "express";
import axios from 'axios';
export const router = express.Router();

import DBG from 'debug';
const debug = DBG('server:router-root');
const error = DBG('server:error-root');

const todo = {
  id: 1,
  task: "Get the milk",
};

const getSuperHerors = async () => {
  try {
    const TOKEN = process.env.SUPER_HERO_TOKEN;
    const response = await axios.get(
      `https://superheroapi.com/api/${TOKEN}/1`,{"Content-Type`": "application/json"}
    );
    // if (!response.ok) {
    //   throw new Error("Something went wrong!");
    // }

    // const data = await response.json();
    debug(`The response id is ${response.data.id}`);
    debug(`The response powerstats ${response.data.powerstats.strength}`);


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
