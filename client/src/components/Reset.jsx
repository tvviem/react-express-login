import React from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate';
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';

import styles from '../styles/Username.module.css';

export default function Reset() {
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] =
    useFetch('createResetSession');

  const formik = useFormik({
    initialValues: {
      password: 'admin@123',
      confirm_pwd: 'admin@123'
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({
        username,
        password: values.password
      });
      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset successfully...!</b>,
        error: <b>Could not reset your password!</b>
      });
      resetPromise.then(() => {
        navigate('/password');
      });
    }
  });

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  if (status && status !== 201)
    return <Navigate to={'/password'} replace={true}></Navigate>;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex h-screen">
        <div className={styles.glass}>
          <div className="flex flex-col items-center ">
            <h4 className="text-4xl">Reset</h4>
            <span className="text-lg w-2/3 text-center text-gray-500">
              Enter New Password
            </span>
          </div>
          <form className="py-10" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-3">
              <input
                {...formik.getFieldProps('password')}
                className={styles.textbox}
                type="password"
                placeholder="New Password"
              />
              <input
                {...formik.getFieldProps('confirm_pwd')}
                className={styles.textbox}
                type="password"
                placeholder="Retype New Password"
              />
              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
