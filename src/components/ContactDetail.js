import React from 'react';
import { Link, useLocation } from 'react-router-dom';
const ContactDetail = () => {
  const location = useLocation();
  const { id, name, email } = location.state.contact;
  return (
    <>
      <div key={id} className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{email}</p>
          <Link to="/">
            <button className="btn btn-primary">Back</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ContactDetail;
