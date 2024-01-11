import css from "components/Styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addContactsThunk } from "../../redux/contact/contact.reducer";
import { selectContacts } from "../../redux/contact/contact.selectors";

export const FormUserMenu =() => {
  const dispatch = useDispatch()
  const contacts = useSelector(selectContacts)


  const onFormSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const newContact = {
            name: event.target.elements.name.value,
            number: event.target.elements.number.value,
    };

    const hasDuplicates = contacts.some(item => item.name === newContact.name);

    if (hasDuplicates) {
      alert(`${newContact.name} is already in the contacts list`);
      return;
    }
   
    dispatch(addContactsThunk(newContact));

    form.reset();
  };

return (

    <div>
  
    <h1 className={css.titlePage}>Phonebook</h1>

    <form className={css.form} onSubmit={onFormSubmit}>
    <label className={css.titleItem}>
      Name:
    </label>

        <input
      className={css.input}
      type="text"
      name="name"
      
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      required
    />

    <label className={css.titleItem}>
      Number:
    </label>

        <input
      className={css.input}
      type="tel"
      name="number"
     
      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
      required
    />

    <button className={css.btn} type="submit">
      Add Contact
    </button>
  </form>
  </div> 
)
}