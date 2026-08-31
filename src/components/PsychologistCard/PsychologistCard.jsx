import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import heartActiveIcon from '../../assets/icons/heart-active.svg';
import heartIcon from '../../assets/icons/heart.svg';
import starIcon from '../../assets/icons/star.svg';
import { AuthContext } from '../../context/AuthContext';
import { useFavorites } from '../../context/useFavorites';
import AppointmentModal from '../AppointmentModal/AppointmentModal';
import css from './PsychologistCard.module.css';

const PsychologistCard = ({ psychologist }) => {
  const { currentUser } = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some((item) => item.name === psychologist.name);

  const handleFavoriteClick = () => {
    if (!currentUser) {
      toast.error('Please log in to add psychologists to favorites');
      return;
    }

    if (isFavorite) {
      removeFavorite(psychologist.name);
    } else {
      addFavorite(psychologist);
    }
  };

  return (
    <article className={css.card}>
      <div className={css.avatarWrapper}>
        <img
          className={css.avatar}
          src={psychologist.avatar_url}
          alt={psychologist.name}
        />

        <span className={css.onlineIndicator}></span>
      </div>

      <div className={css.cardContent}>
        <div className={css.cardHeader}>
          <div className={css.titleWrapper}>
            <p className={css.label}>Psychologist</p>
            <h2 className={css.name}>{psychologist.name}</h2>
          </div>

          <div className={css.cardInfo}>
            <div className={css.starWrapper}>
              <img className={css.starIcon} src={starIcon} alt="" />
              <p className={css.rating}>Rating: {psychologist.rating}</p>
            </div>

            <span className={css.divider}></span>

            <p className={css.price}>Price / 1 hour:</p>

            <span className={css.priceValue}>
              {psychologist.price_per_hour}$
            </span>

            <button
              className={css.favoriteButton}
              type="button"
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
              onClick={handleFavoriteClick}
            >
              <img
                className={css.heartIcon}
                src={isFavorite ? heartActiveIcon : heartIcon}
                alt=""
              />
            </button>
          </div>
        </div>

        <div className={css.details}>
          <div className={css.detailsRow}>
            <p className={css.detail}>
              <span>Experience:</span> {psychologist.experience}
            </p>

            <p className={css.detail}>
              <span>License:</span> {psychologist.license}
            </p>
          </div>

          <div className={css.detailsRow}>
            <p className={css.detail}>
              <span>Specialization:</span> {psychologist.specialization}
            </p>

            <p className={css.detail}>
              <span>Initial consultation:</span>{' '}
              {psychologist.initial_consultation}
            </p>
          </div>
        </div>

        <p className={css.about}>{psychologist.about}</p>

        {!isExpanded && (
          <button
            className={css.readMoreButton}
            type="button"
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}

        {isExpanded && (
          <div className={css.reviews}>
            {psychologist.reviews.map((review) => (
              <div className={css.review} key={review.reviewer}>
                <div className={css.reviewHeader}>
                  <div className={css.reviewerAvatar}>
                    {review.reviewer.charAt(0)}
                  </div>

                  <div className={css.reviewerInfo}>
                    <p className={css.reviewerName}>{review.reviewer}</p>

                    <div className={css.reviewRating}>
                      <img className={css.starIcon} src={starIcon} alt="" />
                      <span>{review.rating}</span>
                    </div>
                  </div>
                </div>

                <p className={css.reviewComment}>{review.comment}</p>
              </div>
            ))}

            <button
              className={css.appointmentButton}
              type="button"
              onClick={() => {
                if (!currentUser) {
                  toast.error('Please log in to make an appointment');
                  return;
                }

                setIsAppointmentOpen(true);
                setIsExpanded(false);
              }}
            >
              Make an appointment
            </button>
          </div>
        )}
      </div>

      {isAppointmentOpen && (
        <AppointmentModal
          psychologist={psychologist}
          onClose={() => setIsAppointmentOpen(false)}
        />
      )}
    </article>
  );
};

export default PsychologistCard;
