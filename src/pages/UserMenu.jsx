import React from 'react';
import { FormUserMenu } from 'components/FormUserMenu/FormUserMenu';

import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import css from '../components/Styles.module.css'
const UserMenu =() => {
  
    return(
        <div className={css.UP}>
   <div className={css.UM_main}>
<FormUserMenu/>
<h2 className={css.titlePage}>Contacts:</h2>
<Filter/>
</div>
<ContactList/>
        </div> 
    )
    
}

export default UserMenu;