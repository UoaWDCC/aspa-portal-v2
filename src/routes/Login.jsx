import React from "react";

export default function Login() {
  return (
    <div className="h-full flex justify-center items-center">
      <form className="flex flex-col gap-12 min-w-[30%] max-w-2xl bg-gray-900 p-12 border-b-2 border-amber-400">
        <h1 className="text-center text-5xl">Login</h1>
        <div className="flex flex-col gap-2">
          <label className="text-lg" htmlFor="">
            Email
          </label>
          <input
            type="text"
            className="bg-transparent px-3 py-2 border-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-8 justify-between">
            <label className="text-lg" htmlFor="">
              Password
            </label>
            <span className="text-sky-200">Forgot Password?</span>
          </div>
          <input
            type="text"
            className="bg-transparent px-3 py-2 border-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <button className="border-2 border-white text-lg px-12 py-2">
            Login
          </button>
          <a className="text-sky-200" href="/register">
            New user?
          </a>
        </div>
      </form>
    </div>
  );
}
