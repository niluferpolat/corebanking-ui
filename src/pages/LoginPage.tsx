import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import * as yup from "yup";

function LoginPage() {
  const schema = yup
    .object({
      usernameOrEmail: yup.string().required("Username or Email is required"),
      password: yup.string().required("Password is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <h1 className="text-2xl">Welcome Back!</h1>
      <p className="mt-4">Please log in to your account.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
        <div>
          <InputText
            invalid={!!errors.usernameOrEmail}
            className="w-full"
            {...register("usernameOrEmail")}
            placeholder="Username or Email"
          />
          {errors.usernameOrEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.usernameOrEmail.message}</p>
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
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" label="Sign In" className="mt-4 w-full" />
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline font-bold">
          Sign Up
        </a>
      </p>
    </div>
  );
}

export default LoginPage;
