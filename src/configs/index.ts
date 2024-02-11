import defaultConfig from "./config";
import type ConfigType from "./models/ConfigType";

const environmentConfig: ConfigType | Partial<ConfigType> = require(process.env.REACT_APP_ENVIRONMENT_NAME ? `./${process.env.REACT_APP_ENVIRONMENT_NAME}.config` : "./config").default;

const CONFIG: ConfigType = {
  ...defaultConfig,
  ...environmentConfig,
};

export { ConfigType };
export default CONFIG;
