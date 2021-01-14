const setToken = (token) => {
   return localStorage.setItem("ACCESS_TOKEN", token);
};

const getToken = () => {
   return localStorage.getItem("ACCESS_TOKEN");
};

const clearToken = () => {
   localStorage.clear();
};

const getRole = () => {
   return getToken()?"ADMIN":"GUEST";
};

export default {
   getToken,
   setToken,
   clearToken,
   getRole,
};


