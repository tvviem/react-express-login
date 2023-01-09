import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';

import styles from '../styles/Username.module.css';

export default function Recover() {
  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    }
  });
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex h-screen">
        <div className={styles.glass}>
          <div className="flex flex-col items-center ">
            <h4 className="text-4xl">RECOVERY</h4>
            <span className="text-lg w-1/2 text-center text-gray-500">
              Enter OTP to recover password
            </span>
          </div>
          <form className="" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-3">
              <span className="py-4 text-sm text-center text-gray-500">
                Enter 6 digit OTP sent to your email address.
              </span>
              <input className={styles.textbox} type="text" placeholder="OTP" />
              <button className={styles.btn} type="submit">
                Recover
              </button>
            </div>
            <div className="text-center py-3">
              <span className="text-gray-500">
                Can't get OTP? <button className="text-red-500">Resend</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
