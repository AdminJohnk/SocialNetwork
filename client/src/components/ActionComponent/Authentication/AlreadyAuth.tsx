import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingLogo from '../../GlobalSetting/LoadingLogo/LoadingLogo';
import { CHECK_LOGIN_SAGA } from '../../../redux/actionSaga/AuthActionSaga';

const AlreadyAuth = () => {
  const dispatch = useDispatch();

  const login = useSelector((state: any) => state.authReducer.login);

  useEffect(() => {
    dispatch(CHECK_LOGIN_SAGA());
  }, []);

  if (login === true) {
    return <Navigate to="/" />;
  }

  if (login !== null) return <Outlet />;

  return <LoadingLogo />;
};

export default AlreadyAuth;
