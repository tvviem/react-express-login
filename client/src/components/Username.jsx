import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';
import styles from '../styles/Username.module.css';

export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: 'example123'
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log('USERNAME: ' + values.username);
      setUsername(values.username);
      navigate('/password');
    }
  });
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex h-screen">
        <div className={styles.glass}>
          <div className="flex flex-col items-center ">
            <h4 className="text-4xl">HELLO AGAIN!</h4>
            <span className="text-lg w-2/3 text-center text-gray-500">
              Explore More By Connecting with us
            </span>
          </div>
          <form className="" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} />
            </div>
            <div className="flex flex-col gap-3">
              <input
                {...formik.getFieldProps('username')}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <button className={styles.btn} type="submit">
                Let's GO
              </button>
            </div>
            <div className="text-center py-3">
              <span className="">
                Not a member!{' '}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
