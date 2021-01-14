import Register from "../components/Register";
import Login from "../components/Login";
import Profile from "../components/Profile";

const components  = {
   register: {
      path: "/register",
      page: Register
   },
   login: {
      path: "/",
      page: Login
   },
   profile: {
      path: "/profile",
      page: Profile
   },
};

const roles = {
   GUEST: [
      components.register,
      components.login,
   ],
   ADMIN: [
      components.profile,
   ],
};

export default roles;