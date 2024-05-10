import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <>
      <footer className="flex justify-around items-start m-4">
        <div>
          <Link href={"/"}>KRSHNA</Link>
          <address>
            Pirangut Pune,
            <br />
            Maharashtra, Bharat
            <br />
            Pincode - 412115
          </address>
          <div>
            <Link href="mailto:info@gmail.com">Email - Info@gmail.com</Link>
          </div>
          <div>
            <Link href="tel:+91 123456789">CustomerCare -123456789</Link>
          </div>
        </div>
        <menu>
          <h3>Pages</h3>
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
        <menu>
          <h3>Connect with Us</h3>
          <Link href="#">
            <li>Instagram</li>
          </Link>
          <Link href="#">
            <li>Twitter</li>
          </Link>
          <Link href="#">
            <li>Facebook</li>
          </Link>
          <Link href="#">
            <li>Youtube</li>
          </Link>
        </menu>
      </footer>
      <div className="flex justify-center items-center">
        &#169;Copyright 2024 – All Right Reserved by KRSHNA
      </div>
    </>
  );
}
