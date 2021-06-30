import { CorsOptions } from "cors";

const CORS_WHITE_LIST: string[] = [
  "http://localhost:3000",
  "https://animalcardom.vercel.app",
];

const CORS_CONFIG: CorsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (CORS_WHITE_LIST.includes(origin!) || !origin) {
      callback(null, true);
    } else callback(new Error("Not allowed by CORS"));
  },
};

export default CORS_CONFIG;
