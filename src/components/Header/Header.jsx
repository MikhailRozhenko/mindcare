import { signOut } from 'firebase/auth';
import { useContext, useState } from 'react';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

import userIcon from '../../assets/icons/user.svg';
import { AuthContext } from '../../context/AuthContext';

import LoginModal from '../LoginModal/LoginModal';
import RegistrationModal from '../RegistrationModal/RegistrationModal';

import css from './Header.module.css';

const Header = () => {
  const location = useLocation();

  const isInternalPage =
    location.pathname === '/psychologists' ||
    location.pathname === '/favorites';
  const { currentUser } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenRegistration = () => {
    setIsRegistrationOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseRegistration = () => {
    setIsRegistrationOpen(false);
  };

  return (
    <>
      <header
        className={`${css.header} ${
          isInternalPage ? css.psychologistsHeader : ''
        }`}
      >
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
              {currentUser && (
                <NavLink
                  className={({ isActive }) =>
                    `${css.mobileNavLink} ${isActive ? css.active : ''}`
                  }
                  to="/favorites"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Favorites
                </NavLink>
              )}
            </nav>

            {currentUser ? (
              <div className={css.userInfo}>
                <div className={css.userIcon}>
                  <img src={userIcon} alt="" />
                </div>

                <span className={css.userName}>{currentUser.displayName}</span>
                <button
                  className={css.logoutButton}
                  type="button"
                  onClick={handleLogout}
                >
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
          <NavLink
            className={({ isActive }) =>
              `${css.mobileNavLink} ${isActive ? css.active : ''}`
            }
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${css.mobileNavLink} ${isActive ? css.active : ''}`
            }
            to="/psychologists"
            onClick={() => setIsMenuOpen(false)}
          >
            Psychologists
          </NavLink>
          {currentUser && (
            <NavLink
              className={({ isActive }) =>
                `${css.navLink} ${isActive ? css.active : ''}`
              }
              to="/favorites"
            >
              Favorites
            </NavLink>
          )}

          {currentUser ? (
            <div className={css.mobileUserInfo}>
              <div className={css.mobileUserData}>
                <div className={css.mobileUserIcon}>
                  <img src={userIcon} alt="" />
                </div>

                <span className={css.mobileUserName}>
                  {currentUser.displayName}
                </span>
              </div>

              <button
                className={css.mobileLogoutButton}
                type="button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          ) : (
            <div className={css.mobileAuthButtons}>
              <button
                className={css.mobileLoginButton}
                type="button"
                onClick={handleOpenLogin}
              >
                Log In
              </button>

              <button
                className={css.mobileRegistrationButton}
                type="button"
                onClick={handleOpenRegistration}
              >
                Registration
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
