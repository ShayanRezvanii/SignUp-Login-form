import Image from "next/image";
import React, { useState } from "react";
import logo from "../public/SR.png";
import {
  AiOutlineDoubleRight,
  AiOutlineCheckCircle,
  AiOutlineDoubleLeft,
  AiFillCloseCircle,
} from "react-icons/ai";
import axios from "axios";
import Link from "next/link";
import { setCookie, setCookies } from "cookies-next";
import { useRouter } from "next/router";
function Rejester() {
  const router = useRouter();
  const [Error, setError] = useState(false);
  const [login, setlogin] = useState(false);
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [worked, setworked] = useState(false);
  const [massage, setmassage] = useState();
  const [loginEmail, SetLoginEmail] = useState();
  const [loginPassword, SetLoginPassword] = useState();
  const loginemail = (e) => {
    SetLoginEmail(e.target.value);
  };
  const loginpassword = (e) => {
    SetLoginPassword(e.target.value);
  };
  const loginHandler = () => {
    setlogin(!login);
  };
  const SignupHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/users/register", {
        email: email,
        password: password,
        username: name,
      })
      .then((Response) => {
        setworked(true);
        setmassage("SignUp Successful");
        setTimeout(() => {
          setworked(false);
          setlogin(false);
        }, 3000);
        console.log(Response);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  const LoginpageHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("http://Localhost:8000/users/login", {
        username: loginEmail,
        password: loginPassword,
      })
      .then((data) => {
        console.log(data.data.data.token);
        setCookie("TOKEN", data.data.data.token);
        setmassage("Log in Successful");
        setworked(true);
        setError(false);
        setTimeout(() => {
          setworked(false);
          router.push("/");
        }, 3000);
      })
      .catch((err) => {
        setError(true);
        setworked(true);
        setmassage("Invalid Information");
        setTimeout(() => {
          setError(false);
          setworked(false);
        }, 3000);
      });
  };

  const nameinputHandler = (e) => {
    setname(e.target.value);
  };

  const emailinputHandler = (e) => {
    setemail(e.target.value);
  };
  const passwordinputHandler = (e) => {
    setpassword(e.target.value);
  };

  return (
    <div className="bg-neutral-900 flex justify-center items-center w-full h-screen  relative font-sans">
      <div className="w-[80%] md:w-[60%] lg:w-[50%] xl:w-[30%] h-[90%]  bg-slate-50 overflow-hidden rounded drop-shadow-md shadow-lg relative">
        <div
          className={`py-5 w-[80%] px-5 duration-300 bg-neutral-50 drop-shadow-lg absolute rounded z-40  left-1/2 transform -translate-x-1/2 ${
            worked ? "top-10 opacity-100" : "-top-10 opacity-0"
          }`}
        >
          <div className="flex flex-row text-xl items-center  justify-center space-x-4 ">
            {Error ? (
              <AiFillCloseCircle className="text-red-700 text-2xl" />
            ) : (
              <AiOutlineCheckCircle className="text-green-700 text-2xl" />
            )}
            <h1>{massage}</h1>
          </div>
        </div>
        <div className="w-full h-[50%] flex relative items-center justify-center bg-neutral-700">
          <Link href={"/"}>
            <div className="absolute top-5 left-5 bg-neutral-700 hover:bg-neutral-800 hover:text-neutral-50 duration-300 text-white p-4 rounded">
              Back to Home
            </div>
          </Link>
          <Image src={logo} width={80} height={80} alt="" />
        </div>
        <div
          className={`absolute duration-300 left-1/2 transform -translate-x-1/2  top-[35%] z-20 w-[90%] flex-col flex items-center justify-center py-5  bg-white drop-shadow-lg rounded  ${
            login
              ? "-left-1/2 transform -translate-x-1/2  "
              : "left-1/2 transform -translate-x-1/2 "
          }`}
        >
          <h1 className="text-2xl font-semibold mb-5 text-neutral-700">
            Login
          </h1>
          <form
            onSubmit={LoginpageHandler}
            className="flex flex-col justify-center items-center space-y-4 w-[80%] min-h-[250px]"
          >
            <input
              onChange={loginemail}
              type="text"
              className="py-3 border w-full px-2 rounded border-neutral-300"
              placeholder="Username"
            />
            <input
              onChange={loginpassword}
              type="password"
              className="py-3 border w-full px-2 rounded border-neutral-300"
              placeholder="Password"
            />
            <button className="w-[80%]  px-14 rounded py-2 border border-neutral-700 hover:bg-neutral-700 hover:text-white duration-300">
              Login
            </button>
          </form>
          <div
            onClick={loginHandler}
            className=" mt-0 flex text-sm cursor-pointer hover:bg-neutral-700 hover:text-neutral-50 duration-300 text-neutral-700 p-4 rounded flex-row items-center justify-center space-x-2"
          >
            <h1>Sign Up</h1>
            <AiOutlineDoubleRight />
          </div>
        </div>
        <div
          className={`absolute duration-300  -right-1/2 transform translate-x-1/2  top-[35%] z-20 w-[90%] flex-col flex items-center justify-center py-5  bg-white drop-shadow-lg rounded  ${
            login
              ? "right-1/2 transform -translate-x-1/2 "
              : "-right-1/2 transform translate-x-1/2 "
          }`}
        >
          <h1 className="text-2xl  font-semibold mb-5 text-neutral-700">
            SignUp
          </h1>
          <form
            onSubmit={SignupHandler}
            className="flex flex-col justify-center items-center space-y-4 w-[80%] min-h-[250px]"
          >
            <input
              onChange={nameinputHandler}
              type="Name"
              className="py-3 border w-full px-2 rounded border-neutral-300"
              placeholder="Username"
            />

            <input
              onChange={emailinputHandler}
              type="email"
              className="py-3 border w-full px-2 rounded border-neutral-300"
              placeholder="Email"
            />
            <input
              onChange={passwordinputHandler}
              type="password"
              className="py-3 border w-full px-2 rounded border-neutral-300"
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-[80%]  px-14 rounded py-2 border border-neutral-700 hover:bg-neutral-700 hover:text-white duration-300"
            >
              SignUp
            </button>
          </form>
          <div
            onClick={loginHandler}
            className=" mt-0 select-none hover:bg-neutral-700 hover:text-neutral-50 duration-300 text-neutral-700 p-4 rounded flex text-sm cursor-pointer flex-row items-center justify-center space-x-2"
          >
            <AiOutlineDoubleLeft />
            <h1>Log In</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rejester;
