require('dotenv').config();

const WEATHERAPI = process.env.WEATHERAPI !== undefined
  ? process.env.WEATHERAPI
  : config.context.base.environment.WEATHERAPI;

exports.handler = function ( event, context, callback ) {
  callback( null, {
    statusCode: 200,
    body: "Hello, World " + WEATHERAPI
  } );
}