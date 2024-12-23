import "./globals.css";

export const metadata = {
  title: "Crypto Message Converter",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
