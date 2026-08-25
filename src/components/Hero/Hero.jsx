import { Link } from 'react-router-dom';
import arrowUpRight from '../../assets/icons/arrow-up-right.svg';
import checkIcon from '../../assets/icons/check.svg';
import peopleIcon from '../../assets/icons/people.svg';
import questionIcon from '../../assets/icons/question.svg';
import psychologistImage from '../../assets/images/psychologist.jpg';
import css from './Hero.module.css';
const Hero = () => {
  return (
    <section className={css.hero}>
      <div className="container">
        <div className={css.heroContent}>
          <div className={css.heroInfo}>
            <h1 className={css.title}>
              The road to the <span className={css.accent}>depths</span> of the
              human soul
            </h1>
            <p className={css.textHero}>
              We help you to reveal your potential, overcome challenges and find
              a guide in your own life with the help of our experienced
              psychologists.
            </p>
            <Link className={css.getStarted} to="/psychologists">
              Get started
              <img src={arrowUpRight} alt="" />
            </Link>
          </div>

          <div className={css.heroImage}>
            {' '}
            <img
              className={css.heroPhoto}
              src={psychologistImage}
              alt="Psychologist"
            />
            <div className={css.questionBadge}>
              {' '}
              <img src={questionIcon} alt="" />
            </div>
            <div className={css.peopleBadge}>
              <img src={peopleIcon} alt="" />
            </div>
            <div className={css.experienceCard}>
              <div className={css.checkIcon}>
                <img src={checkIcon} alt="" />
              </div>

              <div className={css.experienceInfo}>
                <p className={css.experienceText}>Experienced psychologists</p>
                <p className={css.experienceNumber}>15,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
