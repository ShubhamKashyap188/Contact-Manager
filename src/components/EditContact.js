import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const EditContact = (props) => {
    const location = useLocation();
    const [name, setName] = useState(location.state.contact.name);
    const [email, setEmail] = useState(location.state.contact.email);
    const navigate = useNavigate();

    const update = (e) => {
        e.preventDefault();
        if (name === '' || email === '') {
            alert('Please enter a name and email');
            return;
        }
        props.updateContactHandler({ name, email, id: location.state.contact.id });
        setName('');
        setEmail('');
        navigate('/');
    }
    return (
        <>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h3>Edit Contact</h3>
                    <form onSubmit={update}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} id="exampleInputName" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" value={email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditContact;