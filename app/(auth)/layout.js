import Navbar from "@/components/Navbar";
import { connectToDatabase } from "@/lib/mongodb";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StaySwift",
  description: "One Place Stop for Hospitability",
};

export default async function RootLayout({ children }) {
  await connectToDatabase();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar isLandingPage={false} showSideMenu={false} />
        <main>{children}</main>
      </body>
    </html>
  );
}
