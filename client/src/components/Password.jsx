import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { toast, Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../helper/helper';

import styles from '../styles/Username.module.css';

export default function Password() {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({
        username,
        password: values.password
      });

      toast.promise(loginPromise, {
        loading: 'Checking...',
        success: <b>Login Successfully...</b>,
        error: <b>Password Not Match!</b>
      });

      loginPromise.then((res) => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile');
      });
    }
  });

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex h-screen">
        <div className={styles.glass}>
          <div className="flex flex-col items-center ">
            <h4 className="text-4xl">
              Hello {apiData?.firstName || apiData?.username}
            </h4>
            <span className="text-lg w-2/3 text-center text-gray-500">
              Explore More By Connecting with us
            </span>
          </div>
          <form className="py-2" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center py-4">
              <img
                src={apiData?.profile || avatar}
                className={styles.profile_img}
              />
            </div>
            <div className="flex flex-col gap-3">
              <input
                {...formik.getFieldProps('password')}
                className={styles.textbox}
                type="password"
                placeholder="Password"
              />
              <button className={styles.btn} type="submit">
                Sign in
              </button>
            </div>
            <div className="text-center py-3">
              <span className="">
                Forgot password?{' '}
                <Link className="text-red-500" to="/recover">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
