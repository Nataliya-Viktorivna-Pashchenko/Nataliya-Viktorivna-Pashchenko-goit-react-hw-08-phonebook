import { Suspense, lazy} from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import Layout from "components/Layout/Layout";
import Loader from "./Loader/Loader";

import { refreshThunk } from "../redux/auth/auth.reducer";

import {CONTACTS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE,} from '../constants/routers.js';
import RestrictedRoute  from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";

import '../index.css';

const HomePage = lazy(() => import('../pages/HomePage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const UserMenu = lazy(() => import('pages/UserMenu'));

const appRoutes = [
  {
    path: HOME_ROUTE,
    element: <HomePage />,
  },
  {
    path: LOGIN_ROUTE,
    element: (
      <RestrictedRoute navigateTo={CONTACTS_ROUTE}>
        <LoginPage />
      </RestrictedRoute>
    ),
  },
  {
    path: REGISTER_ROUTE,
    element: (
      <RestrictedRoute navigateTo={CONTACTS_ROUTE}>
        <RegisterPage />
      </RestrictedRoute>
    ),
  },
  {
    path: CONTACTS_ROUTE,
    element: (
      <PrivateRoute>
        <UserMenu />
      </PrivateRoute>
    ),
  },
  
];


const App = () => {
  const dispatch = useDispatch();
    dispatch(refreshThunk());

  return (
   <Layout>
    <Suspense fallback={<Loader/>}>
        <Routes>
        {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
           <Route path="/userMenu" element = {<PrivateRoute><UserMenu /></PrivateRoute>}/> 
        </Routes>
      </Suspense>
    </Layout>
  );
};
export default App;