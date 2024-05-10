"use client";
import { useRouter } from "next/navigation";

export default function UserRegister(): JSX.Element {
  const router = useRouter();
  return (
    <>
      <form
        action="post"
        className="h-screen flex flex-col justify-center items-center"
      >
        <label htmlFor="Username">Username:</label>
        <input
          id="Username"
          type="text"
          autoComplete="username"
          placeholder="Enter Username"
          className="border-2 border-gray-500"
          minLength={4}
          required
        />
        <label htmlFor="Email">Email:</label>
        <input
          id="Email"
          type="text"
          autoComplete="email"
          placeholder="Enter Email"
          className="border-2 border-gray-500"
          minLength={4}
          required
        />
        <label htmlFor="Password">Password:</label>
        <input
          id="Password"
          type="password"
          placeholder="Enter Password "
          className="border-2 border-gray-500"
          minLength={8}
          required
        />
        <label htmlFor="ConfirmPassword">Confirm Password:</label>
        <input
          id="ConfirmPassword"
          type="Password"
          placeholder="Enter Confirm Password "
          className="border-2 border-gray-500"
          minLength={8}
          required
        />
        <button
          type="submit"
          onClick={() => {
            router.push("/login");
          }}
        >
          Register
        </button>
      </form>
    </>
  );
}
