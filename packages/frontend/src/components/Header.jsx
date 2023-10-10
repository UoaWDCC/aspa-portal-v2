import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import axios from "axios";

function Header({ absolute = false }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsOpen(false); // Close the mobile menu when the authentication status changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return unsubscribe; // Unsubscribe from the onAuthStateChanged listener on component unmount
  }, []);

  // Check if logged in user is admin
  useEffect(() => {
    if (!currentUser) {
      // Handle the case when currentUser is not available yet
      return;
    }

    async function isUserAdmin() {
      const token = await currentUser.getIdToken();

      try {
        const response = await axios.get(
          "http://localhost:5000/users/isAdmin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setIsAdmin(data);
        console.log(isAdmin, data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    isUserAdmin();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      navigate("/");
      console.log("User has LOGGED OUT");
    } catch (error) {
      console.log(error);
    }
  };

  const mobileMenuVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.25,
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.25,
        staggerChildren: 0.05,
      },
    },
  };

  const menuLinkVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0,
      },
    },
    closed: {
      opacity: 0,
      y: -24,
      transition: {
        type: "spring",
        bounce: 0,
      },
    },
  };

  return (
    <>
      <nav
        className={`flex md:justify-between px-12 py-6 sans ${
          absolute ? "absolute top-0 left-0 w-full" : ""
        }`}
      >
        <div className="flex gap-8 w-full items-center justify-between md:justify-start md:w-auto">
          <Link to="/" className="flex gap-4 items-center">
            <img src={Logo} alt="" className="h-8" />
            <span className="font-bold text-lg">ASPA</span>
          </Link>
          <GiHamburgerMenu
            className="relative block md:hidden z-50 cursor-pointer"
            onClick={() => setIsOpen((v) => !v)}
            size={20}
          />
          <Link className="hidden md:block" to="/about">
            About
          </Link>
          <Link className="hidden md:block" to="/upcoming-events">
            Upcoming Events
          </Link>
        </div>
        <div className="hidden gap-8 font-bold items-center md:flex">
          {loggedIn && isAdmin ? (
            <Link to="/admin-dashboard" className="mr-8">
              My Dashboard
            </Link>
          ) : (
            <></>
          )}
          {loggedIn && (
            <>
              <Link className="mr-8" to="/my-profile">
                My Profile
              </Link>
              <button onClick={(e) => handleLogout(e)}>Logout</button>
            </>
          )}
          {!loggedIn && (
            <div>
              <Link className="mr-8" to="/login">
                Login
              </Link>
              <Link to="/sign-up">Sign Up</Link>
            </div>
          )}
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-gray-900 flex flex-col justify-center items-center p-4 gap-8 text-xl z-40 md:hidden"
          >
            {loggedIn && isAdmin && (
              <motion.span variants={menuLinkVariants}>
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/admin-dashboard"
                  className="font-bold"
                >
                  My Dashboard
                </Link>
              </motion.span>
            )}
            {loggedIn && (
              <motion.span variants={menuLinkVariants}>
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/my-profile"
                  className="font-bold"
                >
                  My Profile
                </Link>
              </motion.span>
            )}
            <motion.span variants={menuLinkVariants}>
              <Link onClick={() => setIsOpen(false)} to="/about">
                About
              </Link>
            </motion.span>
            <motion.span variants={menuLinkVariants}>
              <Link onClick={() => setIsOpen(false)} to="/upcoming-events">
                Upcoming Events
              </Link>
            </motion.span>
            <motion.span variants={menuLinkVariants}>
              <Link onClick={() => setIsOpen(false)} to="/login">
                Login
              </Link>
            </motion.span>
            <motion.span variants={menuLinkVariants}>
              <Link onClick={() => setIsOpen(false)} to="/sign-up">
                Sign Up
              </Link>
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

Header.propTypes = {
  absolute: PropTypes.bool,
};

export default Header;
