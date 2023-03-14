import { motion } from "framer-motion";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { fadeUpInView } from "./animation/utils";

export default function Login() {
  return (
    <>
      <div className="fixed -z-50 inset-0 bg-black bg-opacity-60"></div>
      <div className="h-full flex justify-center items-center">
        <motion.form
          {...fadeUpInView()}
          className="flex flex-col justify-center items-center min-w-[28%] max-w-2xl px-4"
        >
          <div className="flex flex-col gap-2 text-center mb-10">
            <h1 className="text-5xl">Login</h1>
            <p className="text-lg">Please enter your username and password</p>
          </div>
          <div className="w-full flex flex-col gap-4 mb-8">
            <div className="relative flex items-center pl-2 gap-4 rounded-lg border-2 border-gray-400">
              <AiOutlineUser className="h-8 w-8" />
              <input
                type="text"
                id="email"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white border-none bg-transparent peer outline-none"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-white bg-transparent peer-focus:bg-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-8 left-9 cursor-text"
              >
                Username or Email
              </label>
            </div>
            <div className="relative flex items-center pl-2 gap-4 rounded-lg border-2 border-gray-400">
              <BsKey className="h-8 w-8" />
              <input
                type="text"
                id="password"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white border-none bg-transparent peer outline-none"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-white bg-transparent peer-focus:bg-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-8 left-9 cursor-text"
              >
                Password
              </label>
            </div>
            <span className="text-sky-100 ml-auto">Forgot Password?</span>
          </div>
          <div className="flex flex-col gap-4 items-center w-full">
            <button className="border-2 border-white rounded-full text-lg px-12 py-2 w-[80%]">
              Login
            </button>
            <p>
              Not a member yet?{" "}
              <a className="text-sky-200" href="/register">
                Register!
              </a>
            </p>
          </div>
        </motion.form>
      </div>
    </>
  );
}
