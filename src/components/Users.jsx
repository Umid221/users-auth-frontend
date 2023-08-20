import { useMemo, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAxios } from "../configs/axiosInstance";
import { showErrorMsg } from "../utils/errors";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const httpRequest = useAxios();

  function getUsers() {
    httpRequest({ url: `/users/getAll` }).then((res) => setUsers(res.data));
  }

  useEffect(getUsers, []);

  function handleCheckbox(e, userId) {
    if (!e.target.checked) {
      setSelectedUserIds(
        selectedUserIds.filter((selectedUserId) => selectedUserId !== userId)
      );
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  }

  const isUsersSelected = useMemo(
    () => selectedUserIds.length > 0,
    [selectedUserIds]
  );

  function changeStatus(willBlock) {
    httpRequest({
      method: "put",
      url: "/users/block",
      params: { userIds: selectedUserIds, willBlock },
    })
      .then((res) => {
        toast.success(res.data.message);
        getUsers();
        setSelectedUserIds([]);
      })
      .catch(showErrorMsg);
  }
  function handleDelete() {
    httpRequest({
      method: "delete",
      url: "/users/delete",
      params: { userIds: selectedUserIds },
    })
      .then((res) => {
        toast.success(res.data.message);
        getUsers();
        setSelectedUserIds([]);
      })
      .catch(showErrorMsg);
  }

  return (
    <div className="mx-3">
      <div className="d-flex gap-2 my-3">
        <button
          className={`btn btn-warning ${isUsersSelected ? "" : "disabled"}`}
          onClick={() => changeStatus(true)}
        >
          block
        </button>
        <button
          className={`btn btn-primary ${isUsersSelected ? "" : "disabled"}`}
          onClick={() => changeStatus(false)}
        >
          <i className="bi bi-unlock"></i>
        </button>
        <button
          className={`btn btn-danger ${isUsersSelected ? "" : "disabled"}`}
          onClick={handleDelete}
        >
          <i className="bi bi-trash3"></i>
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">
                <input
                  type={"checkbox"}
                  className={`form-check-input checkbox`}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUserIds(users.map((user) => user.id));
                    } else {
                      setSelectedUserIds([]);
                    }
                  }}
                  checked={
                    selectedUserIds.length === users.length && isUsersSelected
                  }
                />
              </th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Register time</th>
              <th scope="col">Last login time</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                className={
                  selectedUserIds.includes(user.id) ? "table-active" : ""
                }
                key={user.id}
              >
                <td>
                  <input
                    type={"checkbox"}
                    className="form-check-input checkbox"
                    onChange={(e) => handleCheckbox(e, user.id)}
                    checked={selectedUserIds.includes(user.id)}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="date-cell">
                  {user.registerTime &&
                    new Date(user.registerTime).toLocaleString()}
                </td>
                <td className="date-cell">
                  {user.loginTime && new Date(user.loginTime).toLocaleString()}
                </td>
                <td>{user.isBlocked ? "Blocked" : "Active"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
