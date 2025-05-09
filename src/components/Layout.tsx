import Header from "./Header";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main`
  padding-top: 70px;
`;

export default Layout;
