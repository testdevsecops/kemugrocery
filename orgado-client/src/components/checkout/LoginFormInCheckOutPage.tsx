"use client";
import useGlobalContext from "@/hooks/use-context";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Preloader from "../common/Preloader";
interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginFormInCheckOutPage = () => {
  const { loading, setLoading } = useGlobalContext();
  const [loginError, setloginError] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);

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
            
            const token = res.data.data;
            localStorage.setItem("accessToken", token);
            setLoading(false);
            router.push("/checkout");
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
            // Handle any other response messages if needed.
            setLoading(false);
            break;
        }
      })
      .catch((error) => console.log(error));
  };

  if (loading) {
    return <Preloader/>
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="form-row-first">
          <label>
            Username or email <span className="required">*</span>
          </label>
          <input
            type="text"
            {...register("email", {
              required: "Email or UserName is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </p>
        <p className="form-row-last">
          <label>
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </p>
        <p className="form-row d-flex">
          <button className="bd-fill__btn" type="submit">
            Login
          </button>
          <label>
            <input className="e-check-input" id="cbox" type="checkbox" {...register("rememberMe")} />
            Remember me
          </label>
        </p>
        <span>{loginError && loginError}</span>
        <p className="lost-password">
          <a href="#">Lost your password?</a>
        </p>
      </form>
    </>
  );
};

export default LoginFormInCheckOutPage;
