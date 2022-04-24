import React from 'react';
import { Link } from 'react-router-dom';
const CardContact = (props) => {
  const { id, name, email } = props.contact;
  const handleChange = () => {
    props.clickHandler(id);
  }
  return (
    <>
      <li key={id} className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
            <div className="fw-bold">{name}</div>
            {email}
          </Link>
        </div>
        <i className="fa fa-trash text-danger btn" aria-hidden="true" onClick={handleChange}></i>
        <Link to={`/edit`} state={{ contact: props.contact }}>
          <i className="fa fa-pencil text-success btn" aria-hidden="true" ></i>
        </Link>
      </li>
    </>
  );
}

export default CardContact;
