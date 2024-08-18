import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../../styles/admin/allUsers.css'

const AllUsers = () => {

  const [users, setUsers] = useState([]);

  const fetchUsers = async() =>{
    await axios.get("http://localhost:6001/fetch-users").then(
      (response)=>{
          setUsers(response.data);
      }
    ).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    fetchUsers();
  },[])




  return (
    <div className="all-users-page">

      <h3>All Users</h3>

      <div className="all-users">

        {users.map((user)=>(

          <div className="user">
              <span>
                <b>User Id</b>
                <p>{user._id}</p>
              </span>
              <span>
                <b>Username</b>
                <p>{user.username}</p>
              </span>
              <span>
                <b>Email</b>
                <p>{user.email}</p>
              </span>
              <span>
                <b>User Role</b>
                <p>{user.usertype}</p>
              </span>

          </div>

        ))}

      </div>

    </div>
  )
}

export default AllUsers