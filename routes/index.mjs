import { default as express, json } from "express";
import axios from "axios";
export const router = express.Router();

import DBG from "debug";
const debug = DBG("server:router-root");
const error = DBG("server:error-root");

const todo = {
  id: 1,
  task: "Get the milk",
};

const getSuperHerors = async (id) => {
  try {
    const TOKEN = process.env.SUPER_HERO_TOKEN;
    const response = await axios.get(
      `https://superheroapi.com/api/${TOKEN}/${id}`,
      { "Content-Type`": "application/json" }
    );

    const { powerstats, image } = response.data;
    const responseData = {
      id: response.data.id,
      response: response.data.response,
      name: response.data.name,
      powerstats: {
        intelligence: powerstats.intelligence,
        strength: powerstats.strength,
        speed: powerstats.speed,
        durability: powerstats.durability,
        power: powerstats.power,
        combat: powerstats.combat,
      },
      image: {
        url: image.url,
      },
    };

    return responseData;
  } catch (error) {
    return error.message;
  }
};

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const id = 1;

    const data = await getSuperHerors(id);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    // debug(`The req  is ${req.params.id}`);

    const data = await getSuperHerors(req.params.id);
    res.send(data);
  } catch (err) {
    next(err);
  }
});
