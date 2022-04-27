import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";


const App = () => {
  return (
    <>
      <Navbar />
      <h1>App</h1>
      <Routes>
        <Route path='/' element={

          <RequireAuth>
            <Home />
          </RequireAuth>
        }

        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
