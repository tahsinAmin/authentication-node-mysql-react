import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { IoCheckmark, IoPencil, IoTrash } from "react-icons/io5";
import { useSelector } from "react-redux";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { status } = useParams();
  console.log("\n\n\nstatus =", status);
  useEffect(() => {
    getTickets();
  });

  const getTickets = async () => {
    const response = await axios.get("http://localhost:5000/tickets");
    const filteredPlans = status
      ? response.data.filter((ticket) => ticket.status === status)
      : response.data;

    setTickets(filteredPlans);
  };

  const deleteTicket = async (ticketId) => {
    await axios.delete(`http://localhost:5000/tickets/${ticketId}`);
    getTickets();
  };

  const resolveTicket = async (productId) => {
    try {
      await axios.patch(`http://localhost:5000/tickets/${productId}`, {
        status: "resolved",
        assigned: "user"
      });
    } catch (error) {
      if (error.response) {
        console.log("Error =", error);
      }
    }

    getTickets();
  };

  return (
    <div>
      <h1 className="title">Tickets</h1>
      <h2 className="subtitle">List of Tickets</h2>

      {/* <div className="notification is-link">
        <button className="delete" onClick={dele}></button>
        Ticket has been <strong>RESOLVED</strong>!
      </div> */}

      <div className="tabs is-toggle is-toggle-rounded">
        <ul>
          <li className={`${status === "open" ? "is-active": ""}`}>
            <a href="/tickets/open">
              <span>Open</span>
            </a>
          </li>
          <li className={`${status === undefined ? "is-active": ""}`}>
            <a href="/tickets">
              <span>All</span>
            </a>
          </li>
          
          <li className={`${status === "resolved" ? "is-active": ""}`}>
            <a href="/tickets/resolved">
              <span>Resolved</span>
            </a>
          </li>
        </ul>
      </div>

      {tickets.map((ticket, index) => (
        <div className="box" key={index}>
          <div className="is-flex is-justify-content-space-between">
            <div>
              <h1 className="is-size-4 has-text-weight-semibold">
                {ticket.subject}
              </h1>
              <h4 className="is-size-7">{ticket.user.name}</h4>
              <p>{ticket.description}</p>
              {ticket.reply ? (
                <p className="mt-4 ml-4">Admin : {ticket.reply}</p>
              ) : (
                ""
              )}
            </div>
            <div>
              <div>{ticket.status}</div>

              {user && user.role === "admin" ? (
                <div>
                  {ticket.status !== "resolved" && (
                    <>
                      <span className="icon is-large has-text-info">
                        <button onClick={() => resolveTicket(ticket.uuid)}>
                          <IoCheckmark />
                        </button>
                      </span>
                      <span className="icon has-text-success">
                        <button onClick={() => deleteTicket(ticket.uuid)}>
                          <IoTrash />
                        </button>
                      </span>
                      <span className="ml-2">
                        <Link to={`/tickets/edit/${ticket.uuid}`}>Reply</Link>
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <div>
                  <span className="icon has-text-info">
                    <Link to={`/tickets/edit/${ticket.uuid}`}>
                      <IoPencil />
                    </Link>
                  </span>
                  <span className="icon has-text-success">
                    <button onClick={() => deleteTicket(ticket.uuid)}>
                      <IoTrash />
                    </button>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* <table className="table is-striped is-fullwidth">
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
                <Link
                  to={`/tickets/edit/${ticket.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteTicket(ticket.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default TicketList;