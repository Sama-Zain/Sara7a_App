import { WHITE_LIST } from "../../../Config/config.service.js";

export const corsOptions = () => {
    const whitelist = WHITE_LIST.split(",");
    const corsOptions = {
        origin: function (origin, callback) {
            if (whitelist.includes(origin)) {
                callback(null, true);
            } else if(!origin){ // allow all origins(postman)
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    };
    return corsOptions;
};
    