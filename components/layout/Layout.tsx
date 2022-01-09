import { FC } from "react";
import { Header } from "..";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />

      {/* Rest of the page */}
      {children}
      {/* #Rest of the page */}
    </>
  );
};

export default Layout;
