import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditTemplate, PreviewTemplate } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PreviewTemplate />} />
        <Route path='edit/:id' element={<EditTemplate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
