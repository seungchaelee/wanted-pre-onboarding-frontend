import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Components/Header/Header';
import MainPage from './Components/MainPage';
import SignUp from './Components/auth/SignUp';
import SignIn from './Components/auth/SignIn';
import ToDoPage from './pages/TodoPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/todo" element={<ToDoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
