import type { Metadata } from "next";
import { ThemeProvider } from "../src/context/ThemeContext";
import "./globals.css";
import { Kumbh_Sans } from "next/font/google";
import { CartProvider } from "@/src/context/CartContext";
// import { ProductsProvider } from "@/src/context/ProductsContext";
//Fuente a usar
const Kumbh = Kumbh_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});
//Nombre del Proyecto
export const metadata: Metadata = {
  title: "ecommerce-product-page",
  description: "Frontend Mentor challenge built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" type="image/png" />
      <body
        className={`${Kumbh.variable} ${Kumbh.variable} antialiased`}
      >
        <ThemeProvider>
          {/* <ProductsProvider> */}
          <CartProvider>
          <main className="layout lg:pl-40 lg:pr-40">{children}</main>
          </CartProvider>
          {/* </ProductsProvider> */}
        </ThemeProvider>

      </body>
    </html>
  );
}
