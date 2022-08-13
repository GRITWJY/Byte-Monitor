import React from "react";
import {HashRouter, Route} from "react-router-dom";
import JSerror from "../../views/sandbox/error/JSerror";
import Promiseerror from "../../views/sandbox/error/Promiseerror";
import Staticsourceerror from "../../views/sandbox/error/Staticsourceerror";
import Helpdoc from "../../views/sandbox/help/Helpdoc";
import SubmitQues from "../../views/sandbox/help/SubmitQues";

import Home from "../../views/sandbox/home/Home";
import Overview from "../../views/sandbox/overview/Overview";
import Apiperformance from "../../views/sandbox/performance/Apiperformance";
import Pageperformance from "../../views/sandbox/performance/Pageperformance";
import Alert from "../../views/sandbox/set/Alert";
import Paramset from "../../views/sandbox/set/Paramset";
import Sourcemapset from "../../views/sandbox/set/Sourcemapset";
import User from "../../views/sandbox/user/User";

const routes = [
  {
    path: "/home",
    component: Home
  },
  {
    path:"/overview",
    component:Overview
  },
  {
    path:"/user",
    component:User
  },
  {
    path:"/error/javasctipt",
    component:JSerror
  },
  {
    path:"/erro/promise",
    component:Promiseerror
  },
  {
    path:"/erro/static",
    component:Staticsourceerror
  },
  {
    path:"/performance/api",
    component:Apiperformance
  },
  {
    path:"/performance/page",
    component:Pageperformance
  },
  {
    path:"/set/paramater",
    component:Paramset
  },
  {
    path:"/set/sourecMap",
    component:Sourcemapset
  },
  {
    path:"/set/alert",
    component:Alert
  },
  {
    path:"/help/document",
    component:Helpdoc
  },
  {
    path:"/help/submiQuestion",
    component:SubmitQues
  }
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

const MonitorRouter = () => (
  <HashRouter>
      {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
  </HashRouter>
);

export default MonitorRouter;
