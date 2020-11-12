// Load env variables automatically (from docker secrets or env)
require("dotenv").config();
const path = require('path')
const secrets = require("docker-secrets-nodejs");


const getSecret = key => {
  return secrets.get(key) || process.env[key] || undefined;
};

// This is PRIVATE / SECRET
const serverRuntimeConfig = {
  MELI_API: getSecret("MELI_API"),

};

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  serverRuntimeConfig
}