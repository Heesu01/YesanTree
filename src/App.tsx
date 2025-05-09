import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { theme } from "./styles/Theme";

import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import BudgetPage from "./pages/Budget";
import CommunityPage from "./pages/Community";
import WritePage from "./pages/Write";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/write" element={<WritePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
