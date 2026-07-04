import { environment as dev } from "./env.dev";
import { environment as prod } from "./env.prod";

export const environment = import.meta.env.PROD ? prod : dev;
