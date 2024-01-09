import { FormRegister } from 'components/FormRegister/FormRegister';
import React from 'react';
import css from '../components/Styles.module.css';

const RegisterPage =() => {
    return(
        <div className={css.RLP}>
            <h2 className={css.titleItem}>Please, enter your registration details:</h2>
<FormRegister/>
        </div> 
    )
    
}

export default RegisterPage;