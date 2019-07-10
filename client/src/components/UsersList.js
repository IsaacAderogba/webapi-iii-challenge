import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:4000/api/users");
      setUsers(res.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {users.map(user => (
        <p key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></p>
      ))}
    </div>
  );
};

export default UsersList;
