"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserLogin(): JSX.Element {
  const router = useRouter();
  return (
    <>
      <form
        action="post"
        className="h-screen flex flex-col justify-center items-center"
      >
        <label htmlFor="Email">Email:</label>
        <input
          id="Email"
          type="text"
          autoComplete="email"
          placeholder="Enter Email or Username"
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
        <button
          type="submit"
          onClick={() => {
            router.push("/");
          }}
        >
          Login
        </button>
        <p>Forgot Password ?</p>
        <span>
          New to KRSHNA ? <Link href={"/register"}>Register here</Link>
        </span>
      </form>
    </>
  );
}
