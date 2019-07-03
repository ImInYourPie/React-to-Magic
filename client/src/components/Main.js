import React from "react";
import { Switch, Route } from "react-router-dom";
import CardsPanel from "./CardsPanel";

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/cards" component={CardsPanel}></Route>
            <Route exact path="/decks" component={CardsPanel}></Route>
            <Route exact path="/login" component={Login}></Route>
        </Switch>
    </main>
)

export default Main;