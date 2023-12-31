"use client";
import Link from "next/link";
import logo from "../../../public/assets/images/logo.png";
import bg from "../../../public/assets/images/background_login.png";
import Image from "next/image";
import { useForm } from 'react-hook-form';
import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import Toast from '../../components/toast';
import { cookies } from "@/utils/constant";

interface LoginForm {
  identityNumber: string;
  password: string;
  termsAndConditions:string;
}

export default function Page() {
  
  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginForm>();
  const [toast, setToast] = React.useState({ message: '', success: false, visible: false });
  const [isChecked, setIsChecked] = React.useState(false); 
  const router = useRouter();


  const showToast = (message: string, success: boolean) => {
    setToast({ message, success, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Hide the toast after 3 seconds
  };
  
  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const {error,message,result} = await response.json();

      showToast(message, !error);

      if (!error){
        const {token, userIdentityNumber, userName} = result;
        // Store the token in a cookie with a max age of 24 hours
        Cookies.set(cookies.token,token, { expires: 1 });
        Cookies.set(cookies.identityNumber,userIdentityNumber,{ expires: 1 });
        Cookies.set(cookies.fullName,userName,{ expires: 1 });
        // Handle successful login, e.g., redirect to another page
        router.push("/overview")
      }
     
      
    } catch (error: any) {
      setError('password', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  React.useEffect(() => {
    const token = Cookies.get(cookies.token);
    const identityNumber = Cookies.get(cookies.identityNumber);
    const fullName = Cookies.get(cookies.fullName);
    if (token && identityNumber && fullName) {
      router.push("/overview")
    }
  }, []);

  return (
    <>
      <nav className={` w-full z-20 fixed top-0 left-0  `}>
        <div className="max-w-full flex flex-wrap items-center justify-between mx-auto p-4 bg-transparent ">
          <Link href="/" className="flex items-center justify-center mr-6">
            <Image
              src={logo}
              width={100}
              height={100}
              className="max-w-full"
              alt="rizq Logo"
            />
          </Link>
        </div>
      </nav>
      <main>
        <section
          id="login-page"
          className="bg-[url(/assets/images/background_login.png)] lg:bg-none bg-center bg-cover bg-no-repeat"
        >
          {toast.visible && (
            <Toast
              message={toast.message}
              success={toast.success}
             
            />
          )}
          <div className="max-w-screen-2xl md:max-w-screen-xl mx-auto min-h-screen">
            <div className="flex md:flex-row flex-col w-full ">
              <div className="w-full lg:w-1/2 h-full absolute left-0 lg:block hidden">
                <Image src={bg} alt="" className="h-full object-cover" />
              </div>
              <div className="w-full lg:w-1/2 absolute right-0 top-0 bottom-0 flex items-center justify-center">
                <div className="flex justify-center items-center flex-col mx-8">
                  <h1 className="font-bold text-3xl text-center mb-16">
                    Login to Your Account
                  </h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      {...register('identityNumber', { required: 'Identitiy Card Number is required' })} 
                      type="text"
                      className="w-full px-4 mb-2 mt-4 py-4 bg-[#2D3681]  rounded-xl focus:outline-none focus:ring focus:border-[#4DC2E8]"
                      placeholder="Identitiy Card Number"
                    />
                    {errors.identityNumber && <p className="text-red-600 text-sm">{errors.identityNumber.message}</p>}
                    <input
                    {...register('password', { required: 'Password is required' })}
                      type="password"
                      className="w-full mt-2 px-4 py-4 bg-[#2D3681]  rounded-xl focus:outline-none focus:ring focus:border-[#4DC2E8]"
                      placeholder="Password"
                    />
                    {errors.password && <p className="text-red-600 text-sm mb-4">{errors.password.message}</p>}

                    <div className="flex items-center mt-2 mb-4">
                      <input
                        {...register('termsAndConditions', { required: 'Please agree to the terms and conditions.' })}
                        id="link-checkbox"
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        className="w-5 h-5 text-blue-600 bg-transparent bg-opacity-0 border-white rounded-md focus:ring-[#4DC2E8] "
                      />
                      <label
                        htmlFor="link-checkbox"
                        className="ml-2 text-sm text-white font-medium text-gray-900 dark:text-gray-300"
                      >
                        I agree with Rizq-Nasional{" "}
                        <a href="#" className="text-[#4DC2E8] underline">
                          Privacy Policy{" "}
                        </a>
                        and{" "}
                        <a href="#" className="text-[#4DC2E8] underline">
                          Terms Conditions
                        </a>
                        .
                      </label>
                    </div>
                    {errors.termsAndConditions && <p className="text-red-600 text-sm mb-4">{errors.termsAndConditions.message}</p>}

                    <button
                      type="submit"
                      className={`mt-2 w-full text-center text-white bg-[#5A64C3] border-white border-[1px] rounded-[4px] py-2 px-4  font-bold justify-center gap-2`}
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
