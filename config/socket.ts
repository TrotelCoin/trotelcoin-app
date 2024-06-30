import * as dotenv from "dotenv";

dotenv.config();

export const SOCKET_API_KEY = process.env.NEXT_PUBLIC_SOCKET_API_KEY as string;
