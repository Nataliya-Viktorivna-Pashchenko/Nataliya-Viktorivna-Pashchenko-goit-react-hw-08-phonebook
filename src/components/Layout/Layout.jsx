import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectAuthenticated, selectUserData } from "../../redux/auth/auth.selectors";
import { logOutThunk } from "../../redux/auth/auth.reducer";
import css from '../../components/Styles.module.css';

const Layout = ({ children}) => {
  
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  console.log('userData: ', userData);

  const authenticated = useSelector(selectAuthenticated);
  console.log('authenticated: ', authenticated);


  const onLogOut = () => {
    dispatch(logOutThunk());
  }
    return (
        <div className={css.app}>
        <header className={css.Layout}>

          <NavLink className= {({ isActive }) =>
          `${css.headerLink} ${isActive ? css.active : ''}`
        } to = "/">Home</NavLink>

          {authenticated ? (
          <div className={css.contactsUserName}>
          <NavLink className= {({ isActive }) =>
          `${css.headerLink} ${isActive ? css.active : ''}`
        } to = "/userMenu">Contacts</NavLink>

              <span className={css.Hello}>Hello, {userData.name}!</span>
             
              <button className = {css.btnLogOut} onClick={onLogOut}>Log Out</button>
            
          </div>
        ) : (
          <div>
          <NavLink className= "headerLink" to = "/register">Register</NavLink>
          <NavLink className= "headerLink" to = "/login">Login</NavLink>
     
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