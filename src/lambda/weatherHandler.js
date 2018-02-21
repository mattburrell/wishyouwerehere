const fs = require("fs");
const toml = require('toml');
const config = toml.parse(fs.readFileSync('netlify.toml'));

const WEATHERAPI = process.env.WEATHERAPI !== undefined
  ? process.env.WEATHERAPI
  : config.context.base.environment.WEATHERAPI;

exports.handler = function ( event, context, callback ) {
  callback( null, {
    statusCode: 200,
    body: "Hello, World " + WEATHERAPI
  } );
}