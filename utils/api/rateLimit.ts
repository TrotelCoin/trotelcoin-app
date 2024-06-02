import { NextRequest, NextResponse } from "next/server";

let requestCounter: Record<string, number> = {};
let resetTimer: NodeJS.Timeout;
const time = 5 * 1000; // 5 seconds
const requestLimit = 4; // 4 requests per 5 seconds

// reset the counters every 5 seconds
const resetCounters = () => {
  requestCounter = {};
  clearTimeout(resetTimer);
  resetTimer = setTimeout(resetCounters, time);
};
resetCounters(); // start the timer

export default async function rateLimit(req: NextRequest, res: NextResponse) {
  const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];
  const clientIp = { ip }.ip;

  requestCounter[clientIp] = requestCounter[clientIp] || 0;

  if (requestCounter[clientIp] >= requestLimit) {
    return true; // rate limit exceeded
  } else {
    console.log(
      "Request count for IP:",
      clientIp,
      "=",
      ++requestCounter[clientIp]
    );
    return null; // proceed with the request
  }
}
