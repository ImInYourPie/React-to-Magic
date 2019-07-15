import React from "react";
import DecksPanel from "./DeckPanel";
import DecksForm from "./DeckForm";
import DecksSearch from "./DecksSearch";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const DecksView = props => {
  return (
    <div>
      <DecksForm />
      <Divider />
      <br />
      <DecksSearch />
      <DecksPanel />
    </div>
  );
};

export default DecksView;
