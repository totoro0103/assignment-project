import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditTemplate, PreviewTemplate } from "./pages";
import { MainLayout } from "./components/Layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PreviewTemplate />} />
        <Route path='/edit' element={<EditTemplate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
