import Link from "next/link";

export default function Navbar(): JSX.Element {
  return (
    <>
      <nav className="flex justify-center items-center m-4">
        <Link href={"/"}>KRSHNA</Link>
        <menu className="flex flex-1 justify-evenly items-center">
          <Link href={"/"}>
            <li>Home</li>
          </Link>
          <Link href={"/about"}>
            <li>About</li>
          </Link>
          <Link href={"/product"}>
            <li>Product</li>
          </Link>
          <Link href={"contactus"}>
            <li>ContactUs</li>
          </Link>
        </menu>
        <div className="flex justify-center items-center">
          <Link href={"/login"}>Login</Link>
          <div>Checkout Logo</div>
        </div>
      </nav>
    </>
  );
}
