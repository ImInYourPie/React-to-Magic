import React from "react";
import AdminUsers from "./AdminUsers";
import DecksForm from "./DeckForm";
import DecksSearch from "./DecksSearch";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../actions/adminActions";

const DecksView = props => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.items);

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      <Divider />
      <br />
      <Grid container direction="row">
        <Grid item xs={12}>
          <AdminUsers users={users} />
        </Grid>
      </Grid>
    </div>
  );
};

export default DecksView;
