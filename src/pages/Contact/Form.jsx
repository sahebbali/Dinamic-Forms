import React from 'react'
import { useState } from 'react'
import ContactForm from '../../components/ContactForm';
import Table from '../../components/Table';

function Form() {
    const [contacts, setContacts] = useState([]);

    const getContact = (contact)=>{
      setContacts([].concat(contacts, contact));
    }
    console.log(contacts);
  return (
    <div>
      <h1> Contact App</h1>
      <ContactForm getContact={getContact} />
      <Table contacts={contacts} />
    </div>
  )
}

export default Form
