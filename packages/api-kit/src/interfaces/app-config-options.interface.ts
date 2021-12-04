export type BodyParserType = "json" | "urlencoded" | "raw" | "text";

export interface AppConfigOptions {
  cors: boolean;
  bodyParser: BodyParserType;
}
