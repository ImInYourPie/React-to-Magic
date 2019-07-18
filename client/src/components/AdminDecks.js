import React from "react";
import MaterialTable from "material-table";
import { updateDeck, deleteDeck } from "../actions/adminActions";
import DialogDelete from "./DialogDelete";
import DeckBuilder from "./DeckBuilder";

export default function UserTable(props) {
  const [open, setOpen] = React.useState(false);
  const [deckToEdit, setDeckToEdit] = React.useState({});
  const [openDelete, setOpenDelete] = React.useState(false);

  const columns = [
    { title: "Deck Name", field: "name" },
    { title: "Cards", field: "cards.length" },
    { title: "User", field: "user.username" },
    { title: "Registered", field: "registerDate" }
  ];

  const openEditDialog = async (event, deck) => {
    event.preventDefault();
    setDeckToEdit(deck);
    console.log(deck);
    console.log(props.cards);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const openDeleteDialog = (event, deck) => {
    event.preventDefault();
    setDeckToEdit(deck);
    setOpenDelete(true);
  };

  const closeDeleteDialog = () => {
    setOpenDelete(false);
  };

  return (
    <div>
      <MaterialTable
        title="Decks"
        columns={columns}
        data={props.decks}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) => {
              openDeleteDialog(event, rowData);
            }
          },
          {
            icon: "edit",
            tooltip: "Edit User",
            onClick: (event, rowData) => {
              openEditDialog(event, rowData);
            }
          }
        ]}
      />
      <DeckBuilder
        currentCards={deckToEdit.cards ? deckToEdit.cards : []}
        cards={props.cards}
        open={open}
        action={updateDeck}
        _id={deckToEdit._id}
        currentName={deckToEdit.name}
        closeDialog={closeDialog}
      />
      <DialogDelete
        open={openDelete}
        closeDialog={closeDeleteDialog}
        delete={deleteDeck}
        item={deckToEdit}
        name={deckToEdit.name}
      />
    </div>
  );
}
