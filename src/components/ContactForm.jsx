import React from 'react'
import { useState } from 'react'
const INIT_STATE = {
    name: '',
    email: '',
    group: '',
}
function ContactForm({getContact}) {
    const [values, setValues] = useState({...INIT_STATE});
    const {name, email, group} = values;
    const handelChance = (e)=>{
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
     }
     const handelSubmit = (e)=>{
        e.preventDefault();
        getContact(values)
        setValues({...INIT_STATE});
     }
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <div>
            <label htmlFor='name'>Name:</label>
            <input type="text" id='name' name='name' value={name} onChange={handelChance} />
        </div>
        <div>
            <label htmlFor='email'>Email:</label>
            <input type="email" id='email' value={email} name='email' onChange={handelChance} />
        </div>
        <div>
            <label htmlFor='group'>Option:</label>
            <select name='group' id='group' value={group} onChange={handelChance} >
                <option value= ''>Select</option>
                <option value= 'Home'>Home</option>
                <option value= 'Office'>Office</option>
                <option value= 'Online'>Online</option>
                <option value= 'Onsite'>Onsite</option>
            </select>
        </div>
        <hr />
        <input type="submit" value= 'Create New Form' />
      </form>
    </div>
  )
}

export default ContactForm
