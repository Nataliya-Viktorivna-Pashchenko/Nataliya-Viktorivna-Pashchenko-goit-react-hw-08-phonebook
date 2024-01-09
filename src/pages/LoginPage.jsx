import { FormLogin } from 'components/FormLogin/FormLogin';
import React from 'react';
import css from '../components/Styles.module.css'

const LoginPage =() => {
    return(
        <div className={css.RLP}>
            <h2 className={css.titleItem}>Please, enter your email and password:</h2>
<FormLogin/>
        </div> 
    )
    
}

export default LoginPage;