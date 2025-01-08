import React, {useState} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const FormAddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [role, setRole] = useState("")

    const [msg, setMsg] = useState("")

    const navigate = useNavigate();

    const saveUser = async(e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/users", {
                name:  name,
                email: email,
                password:password,
                confPassword:confPassword,
                role:role
            })
            navigate("/users")
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg)
            }
        }
    }
  return (
    <div>
        <h1 className='title'>Users</h1>
        <h2 className='subtitle'>Add New user</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveUser}>
                <p className="has-text-centered">{msg}</p>
                <div className="field">
                        <label className='label'>Name</label>
                        <div className="control">
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="input" placeholder='Name'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className='label'>Email</label>
                        <div className="control">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input" placeholder='email'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className='label'>Password</label>
                        <div className="control">
                            <input value={password} onChange={(e) => setPassword(e.target.value)}  type="password" className="input" placeholder='*****'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className='label'>Confirm Password</label>
                        <div className="control">
                            <input value={confPassword} onChange={(e) => setConfPassword(e.target.value)} type="password" className="input" placeholder='*****'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className='label'>Role</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={role} onChange={(e) => setRole(e.target.value)}  name="" id="">
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type='submit' className='button is-success'>Save</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}
