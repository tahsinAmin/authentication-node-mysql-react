import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const FormControlTicket = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [reply, setReply] = useState("");

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getTicketById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tickets/${id}`);
        setSubject(response.data.subject);
        setDescription(response.data.description);
        setStatus(response.data.status);
        setReply(response.data.reply);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getTicketById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:5000/tickets/${id}`, {
        subject: subject,
        description: description,
        status: status,
        reply: reply,
        assigned: "user"
      });
      navigate("/tickets");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Tickets</h1>
      <h2 className="subtitle">Control Ticket</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Subject</label>
                <div className="control">
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    type="text"
                    className="input"
                    placeholder="Ticket Name"
                    disabled={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="input"
                    placeholder="Price"
                    disabled={true}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Status</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                      <option value="resolved">Resolve</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Reply</label>
                <div className="control">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="input"
                    placeholder="Reply"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};