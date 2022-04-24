import React, { useRef } from 'react';
import CardContact from './CardContact';
const ContactList = (props) => {
    const inputRef = useRef();
    const deleteHandler = (id) => {
        props.getConactId(id);
    }
    const renderContactsList = props.contacts.map((contact, i) => {
        return (
            <CardContact key={i} contact={contact} clickHandler={deleteHandler} />
        );
    })

    const getSearchTerm = () => {
        props.serachKeyword(inputRef.current.value);
    }
    return (
        <><h3>Contact List</h3>
            <input type="text"
                ref={inputRef}
                value={props.term}
                onChange={getSearchTerm}
                id="inputPassword5" className="form-control mb-3" placeholder="Serach contacts" aria-describedby="passwordHelpBlock" />

            <ol className="list-group list-group-numbered">
                {renderContactsList.length > 0 ? renderContactsList: "No contacts available"}
            </ol>
        </>
    );
}

export default ContactList;

