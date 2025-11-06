// // src/api/axiosInstance.js
// import axios from "axios";
// import { toast } from "react-toastify";

// // Base URL
// const baseURL = "https://app.moovymed.de";

// // Create Axios instance
// const axiosInstance = axios.create({
//   baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor: Add access token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const user = JSON.parse(localStorage.getItem("token"));
//     if (user?.access_token) {
//       config.headers["Authorization"] = `Bearer ${user.access_token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor: Handle 401 and refresh token
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         // Get refresh token from localStorage
//         const user = JSON.parse(localStorage.getItem("token"));
//         if (!user?.refresh_token) {
//           throw new Error("No refresh token available");
//         }

//         // Call refresh token API
//         const refreshRes = await axios.post(`${baseURL}/api/v1/user/refresh`, {
//           refresh_token: user.refresh_token,
//         });

//         const newAccessToken = refreshRes.data.access_token;
//         const expires_in = refreshRes.data.expires_in || 120;

//         // Update localStorage user
//         const updatedUser = { ...user, access_token: newAccessToken };
//         localStorage.setItem("token", JSON.stringify(updatedUser));

//         // Update original request with new token
//         originalRequest.headers[
//           "Authorization"
//         ] = `Bearer ${newAccessToken}`;

//         return axiosInstance(originalRequest);
//       } catch (err) {
//         toast.error("Session expired. Please login again.");
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
