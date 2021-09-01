import { urlencoded, json, text, raw } from "express";

function bodyParserMap(config: string) {
  switch (config) {
    case "raw":
      return raw;
    case "text":
      return text;
    case "urlencoded":
      return urlencoded;
    case "json":
      return json;
    default:
      return json;
  }
}

export default bodyParserMap;
