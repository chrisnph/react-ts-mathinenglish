import { motion } from "framer-motion";
import useForm from "../../hooks/useForm";
import { initialValues, validationSchema } from "./formSchema";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const variant = {
  initial: {
    y: -50,
    opacity: 0,
  },

  show: {
    y: -10,
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

const Registration = () => {
  const navigate = useNavigate();

  const nameInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterName = () => {
    if (!nameInputRef.current) return;

    const name = nameInputRef.current.value;

    if (!name) return;

    try {
      setIsLoading(true);
      localStorage.setItem("userInfo", JSON.stringify({ name }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigate("/questionaire");
    }
  };

  const form = useForm(initialValues, validationSchema, handleRegisterName);

  return (
    <motion.div
      initial="initial"
      variants={variant}
      animate="show"
      exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
      className="h-screen flex justify-center items-center font-bold"
    >
      <form
        onSubmit={form.handleSubmit}
        className="w-full md:max-w-[60%] h-[60px]"
      >
        <div className="flex flex-col md:flex-row justify-center items-center h-[50px]">
          <input
            ref={nameInputRef}
            type="text"
            name="name"
            autoFocus
            autoComplete="false"
            placeholder="Enter your name"
            className="bg-white w-full md:min-w-[500px] h-[40px] text-center text-gray-400 capitalize outline-none shadow-lg text-[18px] leading-18 rounded-lg md:rounded-none md:rounded-bl-lg md:rounded-tl-lg mb-[10px] md:mb-0 focus-within:border-1 focus-within:border-green-600 placeholder:text-green-600 placeholder:opacity-[0.2]"
            onChange={form.handleChange}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="shadow-lg sm:mt-[10px] md:mt-0 ml-0 md:ml-[5px] min-h-[40px] rounded-lg md:rounded-none md:rounded-br-lg md:rounded-tr-lg min-w-[190px] w-full md:w-auto flex justify-center items-center outline-none hover:border-2 hover:border-green-600 hover:text-green-600 bg-green-600 hover:bg-white text-white cursor-pointer"
          >
            Start Questionaire
          </button>
        </div>

        {form.errors.name && form.touched.name && (
          <div className="text-red-500 text-[14px] ">
            {form.errors.name.toString()}
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default Registration;
