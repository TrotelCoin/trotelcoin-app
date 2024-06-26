import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env") });

export const SOCKET_API_KEY = process.env.SOCKET_API_KEY as string;
