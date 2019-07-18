import React from "react";
import AdminUsers from "./AdminUsers";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, getCards, getDecks } from "../actions/adminActions";
import AdminCards from "./AdminCards";
import AdminDecks from "./AdminDecks";

const DecksView = props => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.admin.users);
  const cards = useSelector(state => state.admin.cards);
  const decks = useSelector(state => state.admin.decks);

  React.useEffect(() => {
    dispatch(getUsers());
    dispatch(getCards());
    dispatch(getDecks());
  }, []);

  return (
    <div>
      <Divider />
      <br />
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
          <AdminUsers users={users} />
        </Grid>
        <Grid item xs={12}>
          <AdminCards cards={cards} />
        </Grid>
        <Grid item xs={12}>
          <AdminDecks decks={decks} cards={cards} />
        </Grid>
      </Grid>
    </div>
  );
};

export default DecksView;
