import React from "react";
import { useSelector } from "react-redux";
import { selectAuthenticated } from "../redux/auth/auth.selectors";
import { Navigate } from "react-router-dom";


const RestrictedRoute = ({children, navigateTo = "/goit-react-hw-08-phonebook/userMenu" }) => {
const authenticated = useSelector(selectAuthenticated);
return authenticated ? <Navigate to = {navigateTo} replace/> : children;
}

export default RestrictedRoute;