import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

export function Login() {
   const navigate = useNavigate();
   const { login } = useAuth();
   const [input, setInput] = useState("");

   const handleLogin = (x) => {
      try {
         x.preventDefault();
         if (!input) throw { msg: "Name can't be empty" };
         if (input.length < 3) throw { msg: "Name must be 3 characters or more" };
         login(input);
         navigate("/");
      } catch (error) {
         Swal.fire({
            icon: "error",
            title: error.msg,
         });
      }
   };

   return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-300">
         <div className="w-full max-w-xl">
            <form className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
               <div className="mb-4 px-7">
                  <label className="block text-gray-700 text-5xl font-bold mb-6 text-center pb-5 pt-8">Welcome!</label>
                  <input
                     className="appearance-none border rounded-xl border-gray-300 w-full py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-600"
                     id="username"
                     type="text"
                     placeholder="Please enter your name"
                     onChange={(x) => {
                        setInput(x.target.value);
                        console.log(input);
                     }}
                  />
               </div>
               <div className="flex items-center justify-center pb-8">
                  <button className="bg-blue-500 mt-4 rounded-xl hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none" type="submit">
                     Enter
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
