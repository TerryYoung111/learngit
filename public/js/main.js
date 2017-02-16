import React from "react";
import ReactDOM from "react-dom";
import {Router,Route,IndexRoute,hashHistory,browserHistory} from "react-router";
import MainPage from "MainPage";
import Login from "Login";
import Films from "Films";
import Hot from "Hot";
import Informations from "Informations";
import Notshow from "Notshow";
import Screenings from "Screenings";
import Show from "Show";
import Manage from "Manage";
import 'antd/dist/antd.css';

ReactDOM.render(<Router history={hashHistory}>
          <Route path="/" component={MainPage}>
              <IndexRoute component={Login}></IndexRoute>
              <Route path="/login" component={Login}></Route>
              <Route path="/manage" component={Manage}>
                  <Route path="/films" component={Films}></Route>
                  <Route path="/hot" component={Hot}></Route>
                  <Route path="/informations" component={Informations}></Route>
                  <Route path="/notshow" component={Notshow}></Route>
                  <Route path="/screenings" component={Screenings}></Route>
                  <Route path="/show" component={Show}></Route>
              </Route>

          </Route>
  </Router>,document.getElementById('content'));
