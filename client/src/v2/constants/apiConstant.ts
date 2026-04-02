// const MODE = import.meta.env.MODE;

// export const SERVER_URL = `http://localhost:4000/api/v1`;
export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const SERVER_URL_V2 = import.meta.env.VITE_SERVER_URL_V2;

// export const SERVER_URL =
//     MODE === "development"
//         ? `http://localhost:4000/api/v1`
//         : `https://first-voice-dashboard-admin.onrender.com/api/v1`;
