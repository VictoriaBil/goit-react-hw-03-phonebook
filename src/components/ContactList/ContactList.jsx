import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export class ContactList extends Component {
  render() {
    return (
      <ul className={css.list}>
        {this.props.contactData.map(({ name, number, id }) => {
          return (
            <li className={css.contact} key={id}>
              <p className={css.name}>{name}</p> :
              <p className={css.number}>{number}</p>
              <button
                className={css.contactBtn}
                type="button"
                onClick={() => {
                  this.props.deleteContact(id);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contactData: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
