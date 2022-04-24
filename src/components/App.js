import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { uuid } from 'short-uuid';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';
import api from '../api/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const retrivedContacts = async () => {
    const contacts = await api.get("/contacts");
    return contacts.data;
  }

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact
    }
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);  // add new contact to the list

  }
  const updateContactHandler = async (contact) => {
    console.log(contact)
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  }

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  }

  const searchHandler = (serach) => {
    setSearchTerm(serach);
    if (searchTerm) {
      console.log(searchTerm.toLowerCase());
      const result = contacts.filter(contact => Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchResult(result);
    } else {
      setSearchResult(contacts);
    }
  }
  useEffect(() => {
    const allContacts = async () => {
      const contacts = await retrivedContacts();
      if (contacts) {
        setContacts(contacts);
      }
    }
    allContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container mt-5">
          <Routes>
            <Route path='/add' element={<AddContact addContactHandler={addContactHandler} />} />
            <Route path='/' element={<ContactList contacts={searchTerm.length < 1 ? contacts : searchResult} term={searchTerm} serachKeyword={searchHandler} getConactId={removeContactHandler} />} />
            <Route path='/contact/:id' element={<ContactDetail />} />
            <Route path='/edit' element={<EditContact updateContactHandler={updateContactHandler} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
