import React from "react";
import { useSelector } from "react-redux";
import { selectAuthenticated } from "../redux/auth/auth.selectors";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({children, navigateTo = "/goit-react-hw-08-phonebook/login" }) => {
const authenticated = useSelector(selectAuthenticated);
return authenticated ? children : <Navigate to = {navigateTo} replace/> ;
}

export default PrivateRoute;