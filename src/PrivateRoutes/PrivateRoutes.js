import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from '../components/PageNotFound';
import RoleList from "../config/role";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";


function PrivateRoutes(props) {
   const role = props.role || "GUEST";

   return (
      <>
         <Switch>
            {RoleList[role].map(({ path, page: PageComponent }) =>
               <Route exact path={path}>
                  <PageComponent setRole={props.setRole} />
               </Route>)}
            <Route path="*" component={PageNotFound} />
         </Switch>

         
            {/* <Switch>
               <Route exact path="/" component={Login} />
               <Route path="/register" component={Register} />
               <Route path="/profile" component={Profile} />
               <Route path="*" component={PageNotFound} />
            </Switch> */}
         
      </>
   )
}

export default PrivateRoutes;
