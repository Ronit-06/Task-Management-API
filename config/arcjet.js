import arcjet, {shield, detectBot, tokenBucket}  from "@arcjet/node";
import { ARCJET_KEY } from "./env.js"; 

export const aj = arcjet({
  key: ARCJET_KEY, 
  characteristics: ["ip.src"], // Use source IP for identification
  rules: [
    shield({ mode: "LIVE" }), //  Enable shield in LIVE mode
    detectBot({ // Detect bot traffic
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
      ],
    }),
    tokenBucket({ // Rate limiting with token bucket algorithm
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});