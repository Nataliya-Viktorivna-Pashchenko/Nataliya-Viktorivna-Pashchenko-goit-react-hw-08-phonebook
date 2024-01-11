import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectAuthenticated, selectUserData } from "../../redux/auth/auth.selectors";
import { logOutThunk } from "../../redux/auth/auth.reducer";
import css from '../../components/Styles.module.css';

const Layout = ({ children}) => {
  
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const authenticated = useSelector(selectAuthenticated);

  const onLogOut = () => {
    dispatch(logOutThunk());
  }
    return (
        <div className={css.app}>
        <header className={css.Layout}>
          <NavLink className= "headerLink" to = "/goit-react-hw-08-phonebook">Home</NavLink>
          {authenticated ? (
          <div className={css.contactsUserName}>
          <NavLink className= "headerLink" to = "/goit-react-hw-08-phonebook/userMenu">Contacts</NavLink>
              <span className={css.Hello}>Hello, {userData.name}!</span>
             
              <button className = {css.btnLogOut} onClick={onLogOut}>Log Out</button>
            
          </div>
        ) : (
          <div>
          <NavLink className= "headerLink" to = "/goit-react-hw-08-phonebook/register">Register</NavLink>
          <NavLink className= "headerLink" to = "/goit-react-hw-08-phonebook/login">Login</NavLink>
     
    </div>
        )}
        </header>
        <main className={css.main}>
            {children}
        </main>
      </div>
    )
}
export default Layout;