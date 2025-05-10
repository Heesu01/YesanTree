import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { theme } from "./styles/Theme";

import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import AdminBudget from "./pages/AdminBudget";
import CitizenBudget from "./pages/CitizenBudget";
import Community from "./pages/Community";
import Write from "./pages/Write";
import PostDetail from "./pages/PostDetail";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/budget/admin" element={<AdminBudget />} />
            <Route path="/budget/citizen" element={<CitizenBudget />} />
            <Route path="/community" element={<Community />} />
            <Route path="/write" element={<Write />} />
            <Route path="/community/:id" element={<PostDetail />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
