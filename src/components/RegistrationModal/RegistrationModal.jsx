import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { auth } from '../../firebase/firebase';

import closeIcon from '../../assets/icons/close.svg';
import eyeOffIcon from '../../assets/icons/eye-off.svg';
import eyeIcon from '../../assets/icons/eye.svg';

import css from './RegistrationModal.module.css';

const registrationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),

  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const RegistrationModal = ({ onClosed }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      toast.success('Registration successful');
      onClosed();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already in use');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClosed();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClosed]);

  return (
    <div className={css.backdrop} onClick={onClosed}>
      <div className={css.modal} onClick={(event) => event.stopPropagation()}>
        <button
          className={css.closeButton}
          type="button"
          onClick={onClosed}
          aria-label="Close registration modal"
        >
          <img src={closeIcon} alt="" />
        </button>

        <h2 className={css.title}>Registration</h2>

        <p className={css.description}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>

        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.field}>
            <input
              className={css.name}
              type="text"
              placeholder="Name"
              {...register('name')}
            />

            <p className={css.errorMessage}>{errors.name?.message}</p>
          </div>

          <div className={css.field}>
            <input
              className={css.email}
              type="email"
              placeholder="Email"
              {...register('email')}
            />

            <p className={css.errorMessage}>{errors.email?.message}</p>
          </div>

          <div className={css.field}>
            <div className={css.passwordField}>
              <input
                className={css.password}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password')}
              />

              <button
                type="button"
                className={css.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
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
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
