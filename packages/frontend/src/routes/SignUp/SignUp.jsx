import { motion } from "framer-motion";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { fadeUpInView } from "../animation/utils";
// import axios from "axios";
import { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log("User SIGNED UP ith the email", auth?.currentUser?.email);
          setCurrentUser(user);
          navigate("/");
        }
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      {/* back ground filter to make the background darker */}
      <div className="fixed -z-50 inset-0 bg-black bg-opacity-60"></div>

      {/* main container */}
      <div className="h-full flex justify-center items-center">
        {/* form container */}
        <motion.form
          {...fadeUpInView()}
          className="flex flex-col justify-center items-center min-w-[28%] max-w-2xl px-4"
          onSubmit={handleSubmit}
        >
          {/* form header */}
          <div className="flex flex-col gap-2 text-center mb-10">
            <h1 className="text-5xl">Sign Up </h1>
          </div>
          {/* First row of inputs, first name and last name */}
          <div className="w-full flex flex-col gap-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative flex items-center pl-2 gap-4 mb-0 rounded-lg border-2 border-gray-400">
                <AiOutlineUser className="h-8 w-8" />
                <input
                  type="text"
                  id="firstName"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white border-none bg-transparent peer outline-none"
                  placeholder=" "
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <label
                  htmlFor="firstName"
                  className="absolute text-white bg-transparent peer-focus:bg-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-8 left-9 cursor-text"
                >
                  First Name
                </label>
              </div>
              <div className="relative flex items-center pl-2 gap-4 mb-0 rounded-lg border-2 border-gray-400">
                <AiOutlineUser className="h-8 w-8" />
                <input
                  type="text"
                  id="lastName"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white border-none bg-transparent peer outline-none"
                  placeholder=" "
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <label
                  htmlFor="lastName"
                  className="absolute text-white bg-transparent peer-focus:bg-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-8 left-9 cursor-text"
                >
                  Last Name
                </label>
              </div>
            </div>
            {/* second row of inputs, email */}
            <div className="relative flex items-center pl-2 gap-4 rounded-lg border-2 border-gray-400">
              <MdOutlineMailOutline className="h-8 w-8" />
              <input
                type="email"
                id="email"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white border-none bg-transparent peer outline-none"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                htmlFor="email"
                className="absolute text-white bg-transparent peer-focus:bg-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-8 left-9 cursor-text"
              >
                Email
              </label>
            </div>
            {/* third row of inputs, password */}
            <div className="relative flex items-center pl-2 gap-4 rounded-lg border-2 border-gray-400">
              <BsKey className="h-8 w-8" />
              <input
                type="password"
                id="password"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white border-none bg-transparent peer outline-none"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="password"
                className="absolute text-white bg-transparent peer-focus:bg-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-8 left-9 cursor-text"
              >
                Password
              </label>
            </div>
            {/* fourth row of inputs, confirm password */}
            <div className="relative flex items-center pl-2 gap-4 rounded-lg border-2 border-gray-400">
              <BsKey className="h-8 w-8" />
              <input
                type="password"
                id="confirmPassword"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white border-none bg-transparent peer outline-none"
                placeholder=" "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label
                htmlFor="confirmPassword"
                className="absolute text-white bg-transparent peer-focus:bg-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-8 left-9 cursor-text"
              >
                Confirm Password
              </label>
            </div>
            {/* error message for password mismatch, redered conditionally*/}
            {passwordError && (
              <p style={{ color: "red" }}>*Passwords do not match</p>
            )}
            {!passwordError && <div style={{ height: "1.5rem" }}></div>}
            {/* placeholder element so elements dont shift */}
          </div>
          {/* sign up button */}
          <div className="flex flex-col gap-4 items-center w-full">
            <button
              disabled={loading}
              className="border-2 border-white rounded-full text-lg px-12 py-2 w-[80%] hover:text-black hover:bg-white transition duration-300 ease-in-out"
            >
              Sign Up
            </button>
            <p>
              Already have an account?{" "}
              <a className="text-sky-200" href="/login">
                Login!
              </a>
            </p>
          </div>
        </motion.form>
      </div>
    </>
  );
}
