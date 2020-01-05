import React from "react";
import "./App.css";

import AuthPage from "./pages/authPage/authPage.component";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import EventPage from "./pages/eventsPage/eventPage.component";
import BookingPage from "./pages/BookingPage/bookingPage.component";
import MainNavigation from "./components/main-navigation/main-navigation.component";
import MainPage from "./pages/Main/main.page";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainNavigation/>
        <main>
          <Switch>
            <Redirect from="/" to="/events" exact />
            <Route path="/auth" component={AuthPage} />
            <Route path="/events" component={EventPage} />
            <Route path="/booking" component={BookingPage} />
            <Route path="/main" component={MainPage}/>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
