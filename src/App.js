import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Auth/Login/SignIn";
import UserList from "./Views/UserList/UserList";
import Payment from "./Views/Payment/Payment";
import Booking from "./Views/Booking/Booking";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouter from "./PrivateRouter";
import ErrorBoundary from "./ErrorBoundary";
import { Loader } from "./Components/Loader/Loader";
function App() {
  return (
    <>
      {/* <ErrorBoundary> */}
        <ToastContainer autoClose={2000} />
        <BrowserRouter basename="/gawal/admin">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/loader" element={<Loader />} />
            <Route element={<PrivateRouter />}>
              <Route path="/userlist" element={<UserList />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/payment" element={<Payment />} />
            </Route>
          </Routes>
        </BrowserRouter>
      {/* </ErrorBoundary> */}
    </>
  );
}

export default App;
