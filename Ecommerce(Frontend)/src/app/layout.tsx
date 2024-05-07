import { Roboto } from "next/font/google";
import { Metadata } from "next";
import { NextFont } from "next/dist/compiled/@next/font";

const roboto: NextFont = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "",
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
      <body>{children}</body>
    </html>
  );
}
