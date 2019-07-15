import axios from "axios";

export const getUsers = () => dispatch => {
  axios.get("/admin/users").then(res => {
    console.log(res.data);
    dispatch({ type: "GET_USERS", payload: res.data });
  });
};

export const deleteUser = userId => dispatch => {
  axios
    .delete(`/admin/users/delete/${userId}`)
    .then(() => {
      dispatch({ type: "DELETE_USER", payload: userId });
    })
    .catch(error => {
      console.log(error.response.data);
    });
};

export const updateUser = userData => dispatch => {
  console.log(userData);
  axios
    .put(`/admin/users/update/${userData._id}`, {
      username: userData.username,
      realName: userData.realName,
      userType: userData.userType
    })
    .then(res => {
      dispatch({ type: "UPDATE_USER", payload: userData });
    })
    .catch(error => {
      console.log(error.response.data);
    });
};
