import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./router/Components/Header";
import Footer from "./router/Components/Footer";
import Authentication from "./router/Authentication/Authentication";
import COM38 from "./router/COM38/COM38";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/COM38" element={<COM38 />} />
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
