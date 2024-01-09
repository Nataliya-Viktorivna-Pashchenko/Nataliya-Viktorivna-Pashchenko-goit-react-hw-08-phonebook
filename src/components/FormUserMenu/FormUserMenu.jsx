import css from "components/Styles.module.css";
import { useDispatch } from "react-redux";
import { addContactsThunk } from "../../redux/contact/contact.reducer";

export const FormUserMenu =() => {
  const dispatch = useDispatch()



  const onFormSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const newContact = {
            name: event.target.elements.name.value,
            number: event.target.elements.number.value,
    };
    console.log('newContact: ', newContact);
   
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