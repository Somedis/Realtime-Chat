import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { register } from '../features/user';
import LogButton from '../components/UI/Buttons/LogButton';
import { AiFillLock } from 'react-icons/ai';
import { BsFillPersonFill, BsEnvelopeFill } from 'react-icons/bs';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { registered, error, loading } = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    email: '',
    login: '',
    password: '',
  });

  const { email, login, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    dispatch(register({ email, login, password }));
  };

  if (registered) return <Navigate to='/login' />;

  return (
    <div className='container dark'>
      <div className='app register'>
        <div className='container-form'>
          <div className='title-reg'>
            <h1>Registration</h1>
          </div>
          <form className='form-register' onSubmit={onSubmit}>
            <div className='form-group'>
              <label className='form-label' htmlFor='email'>
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
              <div className='error-container'>
                {!error['email']
                  ? (<p className='blank'></p>)
                  : (<p className='error'>{error['email']}</p>
                  )
                }
              </div>
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='login'>
                <BsFillPersonFill className='icon' />
                Login
              </label>
              <input
                className='form-control'
                type='text'
                name='login'
                id='login'
                onChange={onChange}
                value={login}
                placeholder='Enter login...'
                required
              />
              <div className='error-container'>
                {!error['login']
                  ? (<p className='blank'></p>)
                  : (<p className='error'>{error['login']}</p>
                  )
                }
              </div>
            </div>
            <div className='form-group'>
              <label className='form-label' htmlFor='password'>
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
                autoComplete='on'
                placeholder='Enter password...'
                required
              />
              <div className='error-container'>
                {!error['error']
                  ? (<p className='blank'></p>)
                  : (<div className='error-container'>
                    <p className='error'>{error['password_error']}</p>
                  </div>)
                }
              </div>
            </div>
            <div className='btn-and-p'>
              <LogButton>Register</LogButton>
              <p>
                Already have an account? <Link to={'/login'} className='links'>
                  Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
};

export default RegisterPage;