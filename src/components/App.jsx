import { Component } from 'react';
import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notification/Notification';
import { nanoid } from 'nanoid';
import css from './App.module.css';

const INITIAL_VALUE = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: INITIAL_VALUE,
    filter: '',
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  addContact = ({ name, number }) => {
    this.setState(prevState => {
      if (
        prevState.contacts.some(
          contact => contact.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        alert(`${name} is already in contacts`);
      } else if (
        prevState.contacts.some(contact => contact.number === number)
      ) {
        alert(`${number} is already in contacts`);
      } else {
        return {
          contacts: [...prevState.contacts, { id: nanoid(), name, number }],
        };
      }
    });
  };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  filteredContacts = () => {
    const normalisedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2 className={css.title}>Contacts</h2>
        {this.state.contacts.length === 0 ? (
          <Notification message="There are no contacts in your phonebook yet" />
        ) : (
          <Filter value={this.filter} onChange={this.changeFilter} />
        )}
        <ContactList
          contactData={this.filteredContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
