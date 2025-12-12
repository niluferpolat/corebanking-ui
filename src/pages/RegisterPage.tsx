import { useForm } from "react-hook-form";
import type { RegisterRequest } from "@/types/AuthenticationTypes";
import { InputText } from "primereact/inputtext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { signUp } from "@/services/AuthService";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";
import { useRef } from "react";

function RegisterPage() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const toast = useRef<Toast>(null);
  const schema = yup
    .object({
      username: yup
        .string()
        .min(5, "Username must have at least 5 characters")
        .required("Username is required"),
      email: yup.string().email("Invalid email format").required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      rewritePassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const request = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      const response = await signUp(request);
      authStore.login(response);
      navigate("/account");
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Registration Failed",
        detail: error.response?.data?.error || "An error occurred during registration.",
      });
    }
  };
  return (
    <div>
      <Toast ref={toast} />
      <h1 className="text-2xl">Sign Up</h1>
      <p className="mt-4">Please fill your details</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
        <div>
          <InputText
            invalid={!!errors.username}
            className="w-full"
            {...register("username")}
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm ml-1 " role="alert">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <InputText
            invalid={!!errors.email}
            className="w-full"
            {...register("email")}
            placeholder="Email Address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm ml-1 " role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <InputText
            invalid={!!errors.password}
            type="password"
            className="w-full"
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm ml-1 " role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <InputText
            invalid={!!errors.rewritePassword}
            type="password"
            className="w-full"
            {...register("rewritePassword")}
            placeholder="Rewrite Password"
          />
          {errors.rewritePassword && (
            <p className="text-red-500 text-sm ml-1 " role="alert">
              {errors.rewritePassword.message}
            </p>
          )}
        </div>
        <Button type="submit" label="Sign Up" className="mt-4 w-full" />
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline font-bold">
          Sign In
        </a>
      </p>
    </div>
  );
}

export default RegisterPage;
