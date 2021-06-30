import { CorsOptions } from "cors";

/* const CORS_WHITE_LIST: string[] = [
  "http://localhost:3000/",
  "https://animalcardom.vercel.app/",
];

const CORS_CONFIG: CorsOptions = {
  origin: (origin: undefined | string, callback: any) => {
    if ((origin && CORS_WHITE_LIST.indexOf(origin) !== -1) || !origin) {
      callback(null, true);
    } else callback(new Error("Not allowed by CORS"));
  },
}; */

const CORS_CONFIG: CorsOptions = {
  origin: "https://animalcardom.vercel.app",
};

export default CORS_CONFIG;
