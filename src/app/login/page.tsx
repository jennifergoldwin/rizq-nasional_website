import Link from "next/link";
import logo from "../../../public/assets/images/logo.png";
import bg from "../../../public/assets/images/background_login.png";
import Image from "next/image";
export default function Page() {
  return (
    <>
      <nav className={` w-full z-20 fixed top-0 left-0  `}>
        <div className="max-w-screen-2xl md:max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-transparent ">
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
                  <input
                    type="text"
                    className="w-full px-4 mb-2 mt-4 py-4 bg-[#2D3681]  rounded-xl focus:outline-none focus:ring focus:border-[#4DC2E8]"
                    placeholder="Identitiy Card Number"
                  />
                  <input
                    type="password"
                    className="w-full mt-2 mb-4 px-4 py-4 bg-[#2D3681]  rounded-xl focus:outline-none focus:ring focus:border-[#4DC2E8]"
                    placeholder="Password"
                  />

                  <div className="flex items-center mt-2 mb-4">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      value=""
                      className="w-5 h-5 text-blue-600 bg-transparent bg-opacity-0 border-white rounded-md focus:ring-[#4DC2E8] "
                    />
                    <label
                      htmlFor="link-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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

                  <Link
                    href="/overview"
                    className={`mt-2 w-full text-center text-white bg-[#5A64C3] border-white border-[1px] rounded-[4px] py-2 px-4 md:mx-4 font-bold justify-center gap-2`}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
