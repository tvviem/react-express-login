import React, { useState } from 'react';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';

export default function Profile() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || ''
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, {
        profile: file || apiData?.profile || ''
      });
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Update successfully...!</b>,
        error: <b>Could not Update!</b>
      });
      //console.log(values);
    }
  });

  /** function to upload image profile */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  /** Logout handler function */
  function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex h-screen">
        <div className={`${styles.glass} ${extend.glass}`}>
          <div className="flex flex-col items-center ">
            <h4 className="text-4xl">PROFILE</h4>
            <span className="text-lg w-2/3 text-center text-gray-500">
              You can update the details.
            </span>
          </div>
          <form className="py-2 space-y-2" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || apiData?.profile || avatar}
                  className={`${styles.profile_img} ${extend.profile_img}`}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                name="profile"
                id="profile"
              />
            </div>
            <div className="flex justify-between">
              <input
                {...formik.getFieldProps('firstName')}
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="FirstName"
              />
              <input
                {...formik.getFieldProps('lastName')}
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="LastName"
              />
            </div>
            <div className="flex justify-between">
              <input
                {...formik.getFieldProps('mobile')}
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="Mobile No."
              />
              <input
                {...formik.getFieldProps('email')}
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="Email*"
              />
            </div>
            <div className="flex flex-col items-center space-y-2 px-2">
              <input
                {...formik.getFieldProps('address')}
                className={`${styles.textbox} w-full`}
                type="text"
                placeholder="Address"
              />
              <button className={`${styles.btn} ${extend.btn}`} type="submit">
                Update profile
              </button>
            </div>
            <div className="text-center">
              <span className="text-gray-500">
                come back later?{' '}
                <button
                  type="button"
                  onClick={userLogout}
                  className="text-red-500"
                  to="/"
                >
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
