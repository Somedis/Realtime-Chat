import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import { resetRegistered, login } from '../features/user';
import { AiFillLock } from 'react-icons/ai';
import { BsEnvelopeFill } from 'react-icons/bs';
import LogButton from '../components/UI/Buttons/LogButton';
import Loader from '../components/UI/Loader/Loader'

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, registered, error, loading } = useSelector(
    state => state.user
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (registered)
      dispatch(resetRegistered());
  }, [registered]);

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    dispatch(login({ email: email.toLowerCase(), password }));
  };

  return (
    <div className='container dark'>
      <div className='app login'>
        <div className='container-form'>
          {loading
            ? <Loader />
            : <div>
              {isAuthenticated
                ? <Navigate to='/' />
                : <div>
                  <div className='title-reg'>
                    <h1>Login</h1>
                  </div>
                  <form className='form-register' onSubmit={onSubmit}>
                    <div className='form-group'>
                      <label className='form-label' htmlFor="email">
                        <BsEnvelopeFill className='icon-email' />
                        Email
                      </label>
                      <input
                        className='form-control'
                        type='email'
                        name='email'
                        id='email'
                        onChange={onChange}
                        value={email}
                        placeholder='Enter email...'
                        autoComplete='on'
                        required
                      />
                    </div>
                    <div>
                      <p className='blank'></p>
                    </div>
                    <div className='form-group'>
                      <label className='form-label' htmlFor="password">
                        <AiFillLock className='icon' />
                        Password
                      </label>
                      <input
                        className='form-control'
                        type='password'
                        name='password'
                        id='password'
                        onChange={onChange}
                        value={password}
                        placeholder='Enter password...'
                        autoComplete='off'
                        required
                      />
                    </div>
                    <div>
                      <p className='blank'></p>
                    </div>
                    <div className='btn-and-p'>
                      <LogButton>Login</LogButton>
                      <p>
                        Don't have an account? <Link to={'/register'} className='links'>
                          Register</Link>
                      </p>
                    </div>
                    <div className='error-container'>
                      {!error['detail']
                        ? (<p className='blank'></p>)
                        : (<div className='error-container'>
                          <p className='error-detail'>{error['detail']}</p>
                        </div>)
                      }
                    </div>
                  </form>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
};

export default LoginPage;