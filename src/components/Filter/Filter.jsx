import css from "components/Styles.module.css";
import { useDispatch } from 'react-redux';
import {  changeFilter } from '../../redux/contact/contact.reducer';

export const Filter = () => {
  const dispatch = useDispatch();

  const onChangeFilter = event => {
    dispatch(changeFilter(event.target.value));
  };
    return (
        <div>
      <label className={css.filter}>
        <span className={css.titleItem}>Find contacts by name</span>
                <input
                    className={css.inputFilter}
          type="text"
          name="filter"
          onChange={onChangeFilter}
        />
      </label>
    </div>
  );
};