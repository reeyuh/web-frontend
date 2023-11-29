import envDev from "./development.json";
import envProd from "./production.json";
import envStage from "./stage.json";

const config = process.env.NEXT_PUBLIC_APP_ENV;
let envConfig;

switch (config) {
  case "production":
    envConfig = envProd;
    break;
  case "stage":
    envConfig = envStage;
    break;
  default:
    envConfig = envDev;
}

export const get = (params) => {
  return envConfig[params];
};

export const host = () => {
  return get("HOST");
};

export const apiServer = (params) => {
  return get("API_SERVER")[params];
};

export const baseApiServer = get("API_SERVER")["PLAIN"];
export const userApiServer = get("API_SERVER")["USER"];
export const agentApiServer = get("API_SERVER")["AGENT"];
export const dashboardApiServer = get("API_SERVER")["DASHBOARD"];
