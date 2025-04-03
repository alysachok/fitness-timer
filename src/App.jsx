import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Timer from "./Timer";

export default function App() {
  return (
    <BrowserRouter basename="/fitness-timer">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </BrowserRouter>
  );
}
