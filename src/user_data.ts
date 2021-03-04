import { ConfigType, ObjectType, UserData } from "./types";
import { without } from "./utils";

const toString = (value: any) => value as string;

const SUPPORTED_CONFIG = {
  layout: toString,
};

function extractConfig(object: ObjectType) {
  return Object.entries(SUPPORTED_CONFIG).reduce((config, [key, fn]) => {
    if (object.hasOwnProperty(key)) {
      config[key as keyof ConfigType] = fn(object[key]);
    }
    return config;
  }, {} as ConfigType);
}

function extractContext(object: ObjectType) {
  return without(object, "$");
}

export default {
  create(object: ObjectType): UserData {
    return {
      config: extractConfig(object.$ || {}),
      context: extractContext(object),
    };
  },
};
