import React from "react";
import BG from "../../../assets/mainBG.jpg";
import usersData from "./usersData";

export default function AdminHome() {
  const firstThreeUsers = usersData.slice(
    usersData.length - 3,
    usersData.length
  );

  return (
    <div className="ml-36 mt-16 text-white z-10">
      <div>
        <h2 className="text-5xl font-bold">Hi. *Admin Name*</h2>
        <div>
          <h3 className="mt-10 mb-4 text-3xl font-semibold">
            Upcoming Scheduled Events
          </h3>
          <div className="w-24 border-b-4 mb-10"></div>
          <div className="flex gap-8">
            <div
              className="h-56 w-96 rounded-md grid place-items-center"
              style={{
                backgroundImage: `url(${BG})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p>Name</p>
            </div>
            <div
              className="h-56 w-96 rounded-md grid place-items-center"
              style={{
                backgroundImage: `url(${BG})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p>Name</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="pt-20 font-semibold text-3xl mb-4">New Users</h3>
          <div className="w-24 border-b-4 mb-8"></div>
          <div>
            {firstThreeUsers.map((user, index) => (
              <p className="text-xl" key={index}>
                {user.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
