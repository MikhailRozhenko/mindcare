import { useContext, useState } from 'react';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { Link, NavLink } from 'react-router-dom';
import userIcon from '../../assets/icons/user.svg';
import { AuthContext } from '../../context/AuthContext';
import LoginModal from '../LoginModal/LoginModal';
import RegistrationModal from '../RegistrationModal/RegistrationModal';
import css from './Header.module.css';

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleOpenRegistration = () => {
    setIsRegistrationOpen(true);
  };

  const handleCloseRegistration = () => {
    setIsRegistrationOpen(false);
  };

  return (
    <>
      <header className={css.header}>
        <div className={`container ${css.headerContainer}`}>
          <Link className={css.logo} to="/">
            psychologists<span className={css.logoDot}>.</span>
            <span className={css.logoText}>services</span>
          </Link>

          <div className={css.headerContent}>
            <nav className={css.navigation}>
              <NavLink
                className={({ isActive }) =>
                  `${css.navLink} ${isActive ? css.active : ''}`
                }
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `${css.navLink} ${isActive ? css.active : ''}`
                }
                to="/psychologists"
              >
                Psychologists
              </NavLink>
            </nav>

            {currentUser ? (
              <div className={css.userInfo}>
                <div className={css.userIcon}>
                  <img src={userIcon} alt="" />
                </div>
                <span className={css.userName}>{currentUser.displayName}</span>
                <button className={css.logoutButton} type="button">
                  Log out
                </button>
              </div>
            ) : (
              <div className={css.authButtons}>
                <button
                  className={css.loginButton}
                  type="button"
                  onClick={handleOpenLogin}
                >
                  Log In
                </button>

                <button
                  className={css.registrationButton}
                  type="button"
                  onClick={handleOpenRegistration}
                >
                  Registration
                </button>
              </div>
            )}
          </div>

          <button
            className={css.menuButton}
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX size={28} /> : <HiOutlineMenuAlt3 size={28} />}
          </button>
        </div>
      </header>
      {isLoginOpen && <LoginModal onClose={handleCloseLogin} />}
      {isRegistrationOpen && (
        <RegistrationModal onClosed={handleCloseRegistration} />
      )}

      {isMenuOpen && (
        <div className={css.mobileMenu}>
          <Link
            className={css.mobileNavLink}
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            className={css.mobileNavLink}
            to="/psychologists"
            onClick={() => setIsMenuOpen(false)}
          >
            Psychologists
          </Link>

          <button
            className={css.mobileLoginButton}
            type="button"
            onClick={() => setIsLoginOpen(true)}
          >
            Log In
          </button>

          <button className={css.mobileRegistrationButton} type="button">
            Registration
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
