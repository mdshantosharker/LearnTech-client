import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import AIChatAssistant from "@/components/AIChatAssistant";

export const metadata: Metadata = {
  title: "LearnTech - Modern Engineering Academy",
  description: "Accelerate your engineering career with high-impact tech courses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0b111e] min-h-screen flex flex-col justify-between">
        <div>
          <Navbar />
          <Toaster />
          <main className=" mx-auto px-4">{children}</main>
          <AIChatAssistant />
        </div>
        <Footer />
      </body>
    </html>
  );
}
