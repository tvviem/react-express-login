import React, { useState } from 'react';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';

export default function Profile() {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: 'doyol56239@cnogs.com',
      mobile: '',
      address: ''
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, { profile: file || '' });
      console.log(values);
    }
  });

  /** function to upload image profile */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex h-screen">
        <div className={`${styles.glass} ${extend.glass}`}>
          <div className="flex flex-col items-center ">
            <h4 className="text-4xl">Profile</h4>
            <span className="text-lg w-2/3 text-center text-gray-500">
              You can update the details.
            </span>
          </div>
          <form className="py-2 space-y-2" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={`${styles.profile_img} ${extend.profile_img}`}
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                name="profile"
                id="profile"
              />
            </div>
            <div className="flex space-x-2">
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
            <div className="flex space-x-2">
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
            <div className="flex flex-col space-y-2">
              <input
                {...formik.getFieldProps('address')}
                className={`${styles.textbox}`}
                type="text"
                placeholder="Address"
              />
              <button className={`${styles.btn} mx-48`} type="submit">
                Update profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
