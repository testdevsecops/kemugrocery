"use client";
import Link from "next/link";

import logo from "../../../public/assets/img/logo/logo.png";
import Image from "next/image";
import axios from "axios";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useGlobalContext from "@/hooks/use-context";
import Preloader from "@/sheardComponent/Preloader/Preloader";

interface FormData {
  email: string;
  password: string;
}
const LoginMain = () => {
  const { loading, setLoading } = useGlobalContext();
  const [loginError, setloginError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(false);
    const email = data.email;
    const password = data.password;
    const userInfo = {
      email,
      password,
    };

    axios
      .post(`${process.env.BASE_URL}user/login`, userInfo)
      .then((res) => {
        switch (res.data.message) {
          case "Login Successful":
            router.push("/");
            const token = res.data.data;
            localStorage.setItem("accessToken", token);
            setLoading(false);

            break;
          case "password not Match":
            setLoading(false);
            setloginError("Password Not Match");
            break;
          case "user not Valid":
            setLoading(false);
            setloginError("user not Valid");
            break;
          case "custome error":
            setLoading(false);
            setloginError("Inter Valid Into");
            break;
          default:
            setLoading(false);
            break;
        }
      })
      .catch((error) => {});
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-login-area flex justify-center items-center w-full h-full"
      >
        <div className="cashier-login-wrapper">
          <div className="cashier-login-logo text-center mb-12">
            <Image src={logo} alt="logo not found" />
          </div>

          <div className="cashier-select-field mb-5">
            <div className="cashier-input-field-style">
              <div className="single-input-field w-full">
                <input
                  type="email"
                  placeholder="Email"
                  
                  {...register("email", {
                    
                    pattern: {
                      value:
                        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
              </div>
              <span className="input-icon">
                <i className="fa-light fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="cashier-select-field mb-5">
            <div className="cashier-input-field-style">
              <div className="single-input-field w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  
                  {...register("password", {
                    
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && <span className="error-message">{errors.password.message}</span>}
              </div>
              <span className="input-icon">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                >
                  <i
                    className={
                      showPassword
                        ? "fa-solid fa-eye"
                        : "fa-regular fa-eye-slash"
                    }
                  ></i>
                </button>
              </span>
            </div>
          </div>
          <span className="error-message">{loginError && loginError}</span>
          <div className="cashier-login-btn mb-7">
            <div className="cashier-login-btn-full default-light-theme">
              <button className="btn-primary" type="submit">
                Login{" "}
              </button>
            </div>
          </div>
          <div className="cashier-login-footer">
            <div className="cashier-login-footer-account text-center">
              <span className="text-[16px] inline-block text-bodyText">
                New account?{" "}
                <Link href="/register" className="text-[16px] text-themeBlue">
                  Register
                </Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginMain;
