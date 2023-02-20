import {
  builder,
  Handler,
  HandlerContext,
  HandlerEvent,
} from "@netlify/functions";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const weatherHandler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const matches = event.path.split("/");
  if (matches.length > 2) {
    const lat = parseFloat(matches[matches.length - 2]);
    const lng = parseFloat(matches[matches.length - 1]);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.WEATHERAPI}`
      );

      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "An error occurred." }),
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request." }),
    };
  }
};

const handler = builder(weatherHandler);

export { handler };
