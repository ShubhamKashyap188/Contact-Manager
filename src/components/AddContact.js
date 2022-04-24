import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AddContact = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const add = (e) => {
        e.preventDefault();
        if (name === '' || email === '') {
            alert('Please enter a name and email');
            return;
        }
        props.addContactHandler({ name, email });
        setName('');
        setEmail('');
        navigate('/');
    }
    return (
        <>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={add}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} id="exampleInputName" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" value={email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddContact;