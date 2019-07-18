import React from "react";
import DecksPanel from "./DeckPanel";
import DecksForm from "./DeckForm";
import Divider from "@material-ui/core/Divider";

const DecksView = props => {
  console.log(props);
  return (
    <div>
      <DecksForm />
      <Divider />
      <br />
      <DecksPanel router={props} />
    </div>
  );
};

export default DecksView;
