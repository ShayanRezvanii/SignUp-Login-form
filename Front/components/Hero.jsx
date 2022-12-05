import axios from "axios";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import logo from "../public/SR.png";
import { useRouter } from "next/router";
function Hero() {
  const secrettoken = getCookie("TOKEN");
  const LOGEDIN = hasCookie("TOKEN");

  const [massage, setmassage] = useState("Not Logged in");
  const [get, setget] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (LOGEDIN) {
      (async () => {
        const res = await axios
          .get("http://localhost:8000/users/user-profile", {
            headers: {
              Authorization: `token ${secrettoken}`,
            },
          })
          .then((res) => {
            setget(true);
            setmassage(res.data.message);
          })
          .catch((err) => {
            console.log("kon laghet");
          });
      })();
    } else {
      return;
    }
  }, []);
  const logoutHandler = () => {
    deleteCookie("TOKEN");
    router.reload();
  };
  return (
    <div className="w-[80%] md:w-[60%] lg:w-[50%] xl:w-[30%] h-[90%]  bg-slate-50 overflow-hidden rounded drop-shadow-md shadow-lg relative">
      <div className="w-full h-[50%] flex relative items-center justify-center bg-neutral-700">
        <Image src={logo} width={80} height={80} alt="" />
      </div>
      <div className="absolute duration-300 left-1/2 transform -translate-x-1/2 min-h-[300px] top-[35%] z-20 w-[90%] flex-col flex items-center justify-center py-5  bg-white drop-shadow-lg rounded ">
        <div className="flex flex-col text-center space-y-5 text-2xl space-x-2">
          <h1>{massage}</h1>
          {get ? (
            <p
              className="text-sm px-6 py-2 bg-blue-500 text-gray-50 hover:bg-blue-800 duration-300 rounded cursor-pointer"
              onClick={logoutHandler}
            >
              Log Out
            </p>
          ) : (
            <Link
              className=" text-sm px-6 py-2 bg-blue-500 text-gray-50 hover:bg-blue-800 duration-300 rounded"
              href={"/Rejester"}
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
