import React from "react";
import { Switch, Route } from "react-router-dom";
import CardsView from "./CardsView";
import Home from "./Home";

const Main = () => (
    <main>
        <Switch>
            {/* <Route exact path="/home" component={Home}></Route> */}
            <Route exact path="/cards" component={CardsView}></Route>
            <Route exact path="/decks" component={CardsView}></Route>
            {/* <Route exact path="/login" component={Login}></Route> */}
        </Switch>
    </main>
)

export default Main;