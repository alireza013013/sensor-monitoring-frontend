import axios from "axios";
import { useTokenStore } from "@/stores/TokenStore";
import type { Token } from "@/models";
import { useRouter } from "vue-router";

// axios.defaults.baseURL = "http://localhost:5299/";
// axios.defaults.baseURL = "https://sensorsonline.ir:5299/";
axios.defaults.baseURL = "https://api.sensorsonline.ir";
//axios.defaults.baseURL = "http://185.97.119.141:5299";

const router = useRouter()

axios.interceptors.request.use(
  async function (config) {
    const tokenStore = useTokenStore();
    if (tokenStore.isValidated) {
      const currentTime = new Date().getTime();
      // if (currentTime > (tokenStore.accessTokenExpireIn as number)) {
      //   if (!tokenStore.isValidationRequestLoading) {
      //     // if (currentTime > tokenStore.refreshTokenExpireIn) {
      //     //     tokenStore.logOut();
      //     //     router.push("/login");
      //     // } 
      //     // else {
      //     // tokenStore.isValidationRequestLoading = true;
      //     // const refreshTokenURL = config.baseURL + "Account/RefreshJsonWebToken";
      //     // const newRequestAxios = axios.create();
      //     // await newRequestAxios.post(refreshTokenURL, {
      //     //   refreshToken: tokenStore.refreshToken
      //     // }).then((res) => {
      //     //   const token_before_request: Token = {
      //     //     accessToken: res.data.data.jsonWebToken.accessToken,
      //     //     refreshToken: res.data.data.jsonWebToken.refreshToken,
      //     //     accessTokenExpireIn: res.data.data.jsonWebToken.accessTokenExpireIn,
      //     //     refreshTokenExpireIn: res.data.data.jsonWebToken.refreshTokenExpireIn,
      //     //     roles: res.data.data.roles,
      //     //   };
      //     //   tokenStore.signIn(token_before_request);
      //     // }).catch(() => {
      //     //   tokenStore.logOut();
      //     //   businessStore.removeBusinesses()
      //     //   router.push("/login");
      //     // });
      //     // tokenStore.isValidationRequestLoading = false;
      //     // }
      //   }
      //   await new Promise((resolve) => {
      //     const interval = setInterval(() => {
      //       if (!tokenStore.isValidationRequestLoading) {
      //         clearInterval(interval);
      //         resolve(true);
      //       }
      //     }, 50);
      //   });
      // }
      config.headers!["Authorization"] = "Bearer " + tokenStore.accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const tokenStore = useTokenStore();
    if (error.response) {
      if (error.response.status == 401) {
        router.push({ name: "Login" });
        tokenStore.logOut();
        // if (error.response.data.meta && error.response.data.meta.code == 12) {
        //   if (!tokenStore.isValidationRequestLoading) {
        //     const currentTime = new Date().getTime();
        //     if (currentTime > tokenStore.refreshTokenExpireIn) {
        //       tokenStore.logOut();
        //       businessStore.removeBusinesses()
        //       router.push("/login");
        //     } else {
        //       tokenStore.isValidationRequestLoading = true;
        //       const refreshTokenURL = axios.defaults.baseURL + "Account/RefreshJsonWebToken";
        //       const newRequestAxios = axios.create();
        //       await newRequestAxios.post(refreshTokenURL, { refreshToken: tokenStore.refreshToken, }).then((res: any) => {
        //         const token_after_response: Token = {
        //           accessToken: res.data.data.jsonWebToken.accessToken,
        //           refreshToken: res.data.data.jsonWebToken.refreshToken,
        //           accessTokenExpireIn: res.data.data.jsonWebToken.accessTokenExpireIn,
        //           refreshTokenExpireIn: res.data.data.jsonWebToken.refreshTokenExpireIn,
        //           roles: res.data.data.roles,
        //         };
        //         tokenStore.signIn(token_after_response);
        //       }).catch(() => {
        //         tokenStore.logOut();
        //         businessStore.removeBusinesses()
        //         router.push("/login");
        //       });
        //       tokenStore.isValidationRequestLoading = false;
        //     }
        //   } else {
        //     await new Promise((resolve) => {
        //       const interval = setInterval(() => {
        //         if (!tokenStore.isValidationRequestLoading) {
        //           clearInterval(interval);
        //           resolve(true);
        //         }
        //       }, 200);
        //     });
        //   }
        //   error.config.headers["Authorization"] = "Bearer " + tokenStore.accessToken;
        //   return axios.request(error.config);
        // } else if (error.response.data.meta && error.response.data.meta.code == 11) {
        //   tokenStore.logOut();
        //   businessStore.removeBusinesses()
        //   router.push("/login");
        // } else {
        //   tokenStore.logOut();
        //   businessStore.removeBusinesses()
        //   router.push("/login");
        // }
      }
    }
    return Promise.reject(error);
  }
);
