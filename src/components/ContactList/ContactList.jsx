import { ContactElement } from "components/ContactElement/ContactElement";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import Loader from "components/Loader/Loader";
import { selectFilterContacts } from '../../redux/contact/contact.selectors';
import { getContactsThunk } from "../../redux/contact/contact.reducer";
import css from '../../components/Styles.module.css'


export const ContactList = () => {

  const isLoading = useSelector(state => state.isLoading);
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();

  const contactsFilter = useSelector(selectFilterContacts);
  useEffect(() => {
    dispatch(getContactsThunk())
  }, [dispatch]);
  
    return (
    <div>
      
        <ul className={css.contactList}>
          {error !== null && <p className="error-bage">{error}</p>}
      {isLoading && <Loader />}
         {contactsFilter.map(({ id, name, number }) => (
          <ContactElement
            key={id}
            id={id}
            name={name}
            number={number} />
        ))}
      </ul>
    </div>
  );
};