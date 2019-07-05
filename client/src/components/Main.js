import React from "react";
import { Switch, Route } from "react-router-dom";
import CardsView from "./CardsView";
import Login from "./Login"
import Home from "./Home";
import Register from "./Register"

const Main = () => (
    <main>
        <Switch>
            {/* <Route exact path="/home" component={Home}></Route> */}
            <Route exact path="/cards" component={CardsView}></Route>
            <Route exact path="/decks" component={CardsView}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
        </Switch>
    </main>
)

export default Main;