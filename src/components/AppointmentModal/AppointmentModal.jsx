import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import closeIcon from '../../assets/icons/close.svg';
import css from './AppointmentModal.module.css';

const appointmentSchema = yup.object({
  name: yup.string().trim().required('Name is required'),

  phone: yup
    .string()
    .trim()
    .required('Phone is required')
    .matches(/^\+?[0-9\s()-]{7,}$/, 'Enter a valid phone number'),

  time: yup.string().trim().required('Meeting time is required'),

  email: yup
    .string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),

  comment: yup.string().trim().required('Comment is required'),
});

const timeOptions = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
];

const AppointmentModal = ({ psychologist, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(appointmentSchema),

    defaultValues: {
      name: '',
      phone: '',
      time: '',
      email: '',
      comment: '',
    },
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const onSubmit = (data) => {
    console.log('Appointment data:', data);

    setIsSuccess(true);
    reset();
  };

  return (
    <div
      className={css.backdrop}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img className={css.closeIcon} src={closeIcon} alt="" />
        </button>

        {isSuccess ? (
          <div className={css.success}>
            <h2 className={css.title}>Appointment booked!</h2>

            <p className={css.description}>
              You are booked for an appointment with {psychologist.name}. We
              will contact you to confirm the meeting details.
            </p>

            <button
              className={css.submitButton}
              type="button"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 className={css.title}>
              Make an appointment
              <br />
              with a psychologists
            </h2>

            <p className={css.description}>
              You are on the verge of changing your life for the better. Fill
              out the short form below to book your personal appointment with a
              professional psychologist. We guarantee confidentiality and
              respect for your privacy.
            </p>

            <div className={css.psychologistInfo}>
              <img
                className={css.avatar}
                src={psychologist.avatar_url}
                alt={psychologist.name}
              />

              <div>
                <p className={css.psychologistLabel}>Your psychologists</p>
                <p className={css.psychologistName}>{psychologist.name}</p>
              </div>
            </div>

            <form
              className={css.form}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div>
                <input
                  className={css.input}
                  type="text"
                  placeholder="Name"
                  {...register('name')}
                />

                {errors.name && (
                  <p className={css.error}>{errors.name.message}</p>
                )}
              </div>

              <div className={css.formRow}>
                <div className={css.field}>
                  <input
                    className={css.input}
                    type="tel"
                    placeholder="+380"
                    {...register('phone')}
                  />

                  {errors.phone && (
                    <p className={css.error}>{errors.phone.message}</p>
                  )}
                </div>

                <div className={css.field}>
                  <Controller
                    name="time"
                    control={control}
                    render={({ field }) => (
                      <div className={css.timeSelect}>
                        <button
                          className={css.timeButton}
                          type="button"
                          onClick={() => setIsTimeOpen(!isTimeOpen)}
                        >
                          <span>{field.value || '00:00'}</span>

                          <span className={css.clockIcon}>◷</span>
                        </button>

                        {isTimeOpen && (
                          <div className={css.timeDropdown}>
                            <p className={css.timeDropdownTitle}>
                              Meeting time
                            </p>

                            <div className={css.timeOptions}>
                              {timeOptions.map((time) => (
                                <button
                                  key={time}
                                  className={css.timeOption}
                                  type="button"
                                  onClick={() => {
                                    field.onChange(time);
                                    setIsTimeOpen(false);
                                  }}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  />

                  {errors.time && (
                    <p className={css.error}>{errors.time.message}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  className={css.input}
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                />

                {errors.email && (
                  <p className={css.error}>{errors.email.message}</p>
                )}
              </div>

              <div>
                <textarea
                  className={css.textarea}
                  placeholder="Comment"
                  {...register('comment')}
                />

                {errors.comment && (
                  <p className={css.error}>{errors.comment.message}</p>
                )}
              </div>

              <button className={css.submitButton} type="submit">
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;
