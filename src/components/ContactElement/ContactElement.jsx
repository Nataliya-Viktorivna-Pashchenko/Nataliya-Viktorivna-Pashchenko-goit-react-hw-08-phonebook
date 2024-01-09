import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

import css from "components/Styles.module.css"
import { deleteContactsThunk } from '../../redux/contact/contact.reducer';

export const ContactElement = ({ id, name, number }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()
  
  const onDelete = contactId => {

    setIsLoading(true);
    dispatch(deleteContactsThunk(contactId));
    setIsLoading(false);
  };

  return (
    <li>
      <span className={css.item}>
        {name}:
      </span>

      <span className={css.item}>
        {number}
      </span>
      
      <button
        className={css.btnDel}
        id={name}
        disabled={isLoading}
        onClick={() => { onDelete(id) }}>
        Delete
      </button>
    </li>
  );
};