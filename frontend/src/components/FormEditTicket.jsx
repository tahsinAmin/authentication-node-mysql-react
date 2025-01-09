import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const FormEditTicket = () => {
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");

    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getTicketById = async() => {
            try {
                const response = await axios.get(`http://localhost:5000/tickets/${id}`);
                setSubject(response.data.subject);
                setDescription(response.data.description);
            } catch (error) { 
                if (error.response) {
                    setMsg(error.response.data.msg)
                }
            }
        }
        getTicketById();
    }, [id])

    const updateProduct = async(e) => {
        e.preventDefault();

        try {
            await axios.patch(`http://localhost:5000/tickets/${id}`, {
              subject: subject,
              description:description
            })
            navigate("/tickets")
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg)
            }
        }
    }
  return (
    <div>
        <h1 className='title'>Tickets</h1>
        <h2 className='subtitle'>Edit Ticket</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={updateProduct}>
                        <p className="has-text-centered">{msg}</p>
                        <div className="field">
                            <label className='label'>Product Name</label>
                            <div className="control">
                                <input value={subject} onChange={(e) => setSubject(e.target.value)} type="text" className="input" placeholder='Ticket Name'/>
                            </div>
                        </div>
                        <div className="field">
                            <label className='label'>Description</label>
                            <div className="control">
                                <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="input" placeholder='Price'/>
                            </div>
                        </div>
                        
                    
                        <div className="field">
                            <div className="control">
                                <button type='submit' className='button is-success'>Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
