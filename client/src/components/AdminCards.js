import React from "react";
import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";
import { deleteCard, updateCard } from "../actions/adminActions";
import EditCard from "./EditCard";
import DialogDelete from "./DialogDelete";

export default function UserTable(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [cardToEdit, setCardToEdit] = React.useState({});
  const [openDelete, setOpenDelete] = React.useState(false);

  // React.useEffect(() => {}, [props.users]);

  const columns = [
    { title: "Card Name", field: "name" },
    { title: "Description", field: "description" },
    { title: "Mana", field: "mana" },
    { title: "User", field: "user.username" }
  ];

  const openEditDialog = async (event, card) => {
    event.preventDefault();
    setCardToEdit(card);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const openDeleteDialog = (event, card) => {
    event.preventDefault();
    setCardToEdit(card);
    setOpenDelete(true);
  };

  const closeDeleteDialog = () => {
    setOpenDelete(false);
  };

  const handleUserSave = newData => {};

  const handleDelete = (event, cardId) => {
    event.preventDefault();
    console.log(cardId);
    dispatch(deleteCard(cardId));
  };

  return (
    <div>
      <MaterialTable
        title="Cards"
        columns={columns}
        data={props.cards}
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
      <EditCard
        open={open}
        card={cardToEdit}
        closeDialog={closeDialog}
        updateCard={updateCard}
        editType={cardToEdit.name}
      />
      <DialogDelete
        open={openDelete}
        closeDialog={closeDeleteDialog}
        delete={deleteCard}
        item={cardToEdit}
        name={cardToEdit.name}
      />
    </div>
  );
}
