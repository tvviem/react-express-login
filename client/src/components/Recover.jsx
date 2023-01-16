import React from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import styles from '../styles/Username.module.css';
import { useState, useEffect } from 'react';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

export default function Recover() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      // console.log(OTP);
      if (OTP) return toast.success('OTP has been send to your email!');
      return toast.error('Problem while generating OTP');
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    let { status } = await verifyOTP({ username, code: OTP });
    if (status === 201) {
      toast.success('Verify Successfully');
      return navigate('/reset');
    }
    return toast.error('WRONG OTP! Check email again please.');
  }

  // Handle of resend OTP
  function resendOTP() {
    let sendPromise = generateOTP(username);
    toast.promise(sendPromise, {
      loading: 'sending...',
      success: <b>OTP has been sent to your email!</b>,
      error: <b>Could not send it!</b>
    });
    sendPromise.then((OTP) => {
      console.log(OTP);
    });
  }
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
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
              <span className="py-4 text-sm text-center text-gray-500">
                Enter 6 digit OTP sent to your email address.
              </span>
              <input
                onChange={(e) => setOTP(e.target.value)}
                className={styles.textbox}
                type="text"
                placeholder="OTP"
              />
              <button className={styles.btn} type="submit">
                Recover
              </button>
            </div>
            <div className="text-center py-3">
              <span className="text-gray-500">
                Can't get OTP?{' '}
                <button className="text-red-500" onClick={resendOTP}>
                  Resend
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
