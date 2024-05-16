import { Roboto } from "next/font/google";
import { Metadata } from "next";
import { NextFont } from "next/dist/compiled/@next/font";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { ReduxProvider } from "./storeProvider";
import "./globals.css";

const roboto: NextFont = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KRSHNA",
  description: "Created by Rohit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html>
      <head></head>
      <body className={`${roboto.className} bg-gray-400`}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
