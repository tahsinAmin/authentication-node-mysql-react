import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import axios from "axios";

const TicketList = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        getTickets();
    }, []);
    
    const getTickets = async () => {
        const response = await axios.get('http://localhost:5000/tickets');
        setTickets(response.data);
    }

    const deleteTicket = async (ticketId) => {
        await axios.delete(`http://localhost:5000/tickets/${ticketId}`);
        
        getTickets()
        
    }
  return (
    <div>
        <h1 className="title">Tickets</h1>
        <h2 className="subtitle">List of Tickets</h2>
        <Link to="/tickets/add" className='button is-primary mb-2'>Add New</Link>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>User</th>
                    <th>Subject</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map((ticket, index) => (
                    <tr key={ticket.uuid}>
                        <td>{index + 1}</td>
                        <td>{ticket.user.name}</td>
                        <td>{ticket.subject}</td>
                        <td>{ticket.description}</td>
                        <td>{ticket.status}</td>
                        <td>
                            <Link to={`/tickets/edit/${ticket.uuid}`} className='button is-small is-info'>Edit</Link>
                            <button onClick={() => deleteTicket(ticket.uuid)} className='button is-small is-danger'>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TicketList;