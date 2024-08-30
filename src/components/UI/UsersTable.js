import styles from "./UsersTable.module.css";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";

const UsersTable = ({ status }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/users/getPcUsers",
          { status }
        );
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [status]);

  const handleStatusChange = async (userEmail) => {
    try {
      await axios.post("http://localhost:8080/users/changeUserStatus", {
        email: userEmail,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === userEmail
            ? {
                ...user,
                status: user.status === "MANAGER" ? "USER" : "MANAGER",
              }
            : user
        )
      );
    } catch (err) {
      console.error(
        "Ошибка при обновлении статуса пользователя: ",
        err.message
      );
    }
  };

  return (
    <div>
      {loading ? (
        <p>Загрузка, пожалуйста подождите...</p>
      ) : error ? (
        <p>При получении данных пользователей возникла ошибка: {error}</p>
      ) : (
        <Table>
          <thead>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Email</th>
            {status === "ADMIN" && <th>Назначить/снять менеджера</th>}
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                {status === "ADMIN" && (
                  <td>
                    <input
                      type="checkbox"
                      checked={user.status === "MANAGER"}
                      onChange={() => handleStatusChange(user.email)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UsersTable;
