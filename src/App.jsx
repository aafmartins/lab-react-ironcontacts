import { useState } from "react";

import allContacts from "./contacts.json";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState(allContacts.slice(0, 5));

  const randomContact = () => {
    const randomIdx = Math.floor(Math.random() * (allContacts.length - 1));
    const selectedContact = allContacts[randomIdx];

    for (const elem of contacts) {
      if (selectedContact !== elem) {
        const addedRandom = [...contacts];
        addedRandom.splice(0, 0, selectedContact);
        setContacts(addedRandom);
      }
    }
  };

  const sortByName = () => {
    const sortedByName = [...contacts];
    sortedByName.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    setContacts(sortedByName);
  };

  const sortByPopularity = () => {
    const sortedByPopularity = [...contacts];
    sortedByPopularity.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    setContacts(sortedByPopularity);
  };

  const deleteContact = (id) => {
    const contactsCopy = [...contacts];
    const filteredContacts = contactsCopy.filter(
      (contact) => contact.id !== id
    );
    setContacts(filteredContacts);
  };

  const contactList = contacts.map((contact) => {
    return (
      <tr>
        <td>
          <img src={contact.pictureUrl} width="100px" alt="" />
        </td>
        <td>
          <p> {contact.name}</p>
        </td>
        <td>
          <p>{contact.popularity}</p>
        </td>
        <td>
          <p>{contact.wonOscar ? "🏆" : "😭"}</p>
        </td>
        <td>
          <p>{contact.wonEmmy ? "🌟" : "😭"}</p>
        </td>
        <td>
          <button
            onClick={() => {
              deleteContact(contact.id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={randomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <table className="Table">
        <tr>
          <th>
            <h2>Picture</h2>
          </th>
          <th>
            <h2>Name</h2>
          </th>
          <th>
            <h2>Popularity</h2>
          </th>
          <th>
            <h2>Won an Oscar</h2>
          </th>
          <th>
            <h2>Won an Emmy</h2>
          </th>
          <th>
            <h2>Action</h2>
          </th>
        </tr>
        {contactList}
      </table>
    </div>
  );
}

export default App;
