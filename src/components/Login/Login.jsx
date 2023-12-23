import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("1234");
  const { user, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: false });
  }, [isAuthenticated, navigate]);
  return (
    <div className="flex items-center justify-center text-indigo-800 font-bold font-ubuntu mt-24">
      <div className="border-2 md:border-4 md:py-8 py-4 md:px-40 px-10 flex flex-col items-center justify-center rounded-2xl border-orange-500 ">
        <h2 className="text-2xl mb-4 mt-2">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="flex flex-col ">
            <label htmlFor="email">Email:</label>
            <input
              value={email}
              onChange={() => setEmail(e.target.value)}
              className="border mb-4 p-2  font-normal rounded text-sm border-indigo-700 "
              type="text"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              value={password}
              onChange={() => setPassword(e.target.value)}
              className="border mb-8  p-2  font-normal rounded text-sm border-indigo-700 "
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="">
            <button className="w-full border md:py-2 py-1 px-2 md:px-4 mb-4 text-white bg-orange-500 hover:bg-orange-400">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
