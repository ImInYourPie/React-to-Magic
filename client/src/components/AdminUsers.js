import React from "react";
import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, updateUser } from "../actions/adminActions";
import EditUser from "./EditUser";
import DialogDelete from "./DialogDelete";

export default function UserTable(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [userToEdit, setUserToEdit] = React.useState({});
  const [openDelete, setOpenDelete] = React.useState(false);
  const loggedUser = useSelector(state => state.user.user);

  // React.useEffect(() => {}, [props.users]);

  const columns = [
    { title: "Username", field: "username" },
    { title: "Real Name", field: "realName" },
    { title: "User Type", field: "userType" },
    { title: "Registered", field: "registerDate" }
  ];

  const openEditDialog = async (event, user) => {
    event.preventDefault();
    setUserToEdit(user);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const openDeleteDialog = (event, user) => {
    event.preventDefault();
    setUserToEdit(user);
    setOpenDelete(true);
  };

  const closeDeleteDialog = () => {
    setOpenDelete(false);
  };

  const handleUserSave = newData => {};

  const handleDelete = (event, userId) => {
    event.preventDefault();
    console.log(userId);
    dispatch(deleteUser(userId));
  };

  return (
    <div>
      <MaterialTable
        title="Users"
        columns={columns}
        data={props.users}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) => {
              if (loggedUser.username === rowData.username) {
                return alert("You can't delete yourself");
              } else {
                openDeleteDialog(event, rowData);
              }
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
      <EditUser
        open={open}
        user={userToEdit}
        closeDialog={closeDialog}
        updateUser={updateUser}
        editType={userToEdit.username}
      />
      <DialogDelete
        open={openDelete}
        closeDialog={closeDeleteDialog}
        delete={deleteUser}
        item={userToEdit}
        name={userToEdit.username}
      />
    </div>
  );
}
