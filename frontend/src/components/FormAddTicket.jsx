import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const FormAddTicket = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const saveTicket = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/tickets", {
        subject: subject,
        description: description,
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
      <h2 className="subtitle">Add New Ticket</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveTicket}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Subject</label>
                <div className="control">
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    type="text"
                    className="input"
                    placeholder="Subject"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea"
                    placeholder="Add description here"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
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
