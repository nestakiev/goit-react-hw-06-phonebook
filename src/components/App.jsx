import React, {useState, useEffect} from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Container } from "./App.styled";
import shortid from "shortid";

export const App = () => {
  const savedContacts = JSON.parse(localStorage.getItem("contacts"));

  const [contacts, setContacts] = useState(savedContacts ? savedContacts : []);
  const [filter, setFilter] = useState('');

  useEffect(() => { localStorage.setItem("contacts", JSON.stringify(contacts)); }, [contacts]);

  const addNewContact = (newContactInfo) => {
    const isDuplicate = contacts.map(a => a.name).includes(newContactInfo.name);
    if (isDuplicate) {
      alert(`${newContactInfo.name} is already in your contacts`)
      return
    };
    
    const newContactId = shortid.generate();
    const newContact = {
      id: newContactId,
      ...newContactInfo,
    };
    setContacts( prevState => [newContact, ...prevState]);
  };

  const deleteContact = (id) => {
    setContacts(prevState => prevState.filter(a => a.id !== id));
  };

  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  };

  const filtredContacts = getFiltredContacts();

  return (
    
      <Container>
    <h1>Phonebook</h1>
    <ContactForm addContact={addNewContact}/>
    <h2>Contacts</h2>
    <Filter onChange={e => setFilter(e.target.value)} value={filter}/>
    <ContactList contacts={filtredContacts} onDelete={deleteContact}/>
      </Container>
    );
};
