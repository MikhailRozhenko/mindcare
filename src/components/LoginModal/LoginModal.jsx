import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import closeIcon from '../../assets/icons/close.svg';
import eyeOffIcon from '../../assets/icons/eye-off.svg';
import eyeIcon from '../../assets/icons/eye.svg';
import { auth } from '../../firebase/firebase';
import css from './LoginModal.module.css';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginModal = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      console.log(userCredential.user);

      toast.success('Login successful');
      onClose();
    } catch (error) {
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        toast.error('Invalid email or password');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(event) => event.stopPropagation()}>
        <button className={css.closeButton} type="button" onClick={onClose}>
          <img src={closeIcon} alt="" />
        </button>
        <h2 className={css.title}>Log In</h2>
        <p className={css.description}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a psychologist.
        </p>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.field}>
            <input
              type="email"
              placeholder="Email"
              className={css.email}
              {...register('email')}
            />

            <p className={css.errorMessage}>{errors.email?.message}</p>
          </div>

          <div className={css.field}>
            <div className={css.passwordField}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={css.password}
                {...register('password')}
              />

              <button
                type="button"
                className={css.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                <img src={showPassword ? eyeIcon : eyeOffIcon} alt="" />
              </button>
            </div>

            <p className={css.errorMessage}>{errors.password?.message}</p>
          </div>
          <button
            className={css.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
