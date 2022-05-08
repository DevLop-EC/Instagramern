import React from 'react';
import avatarNotFound from '../../assets/avatarnotfound.jpg';

export default function ChangePasswordForm({ getUser, auth }) {
  return (
    <main className="w-full  dark:bg-darktheme-body py-4 px-6">
      <div
        className="justify-between items-center p-2 block md:flex"
        data-v-fecf18ac=""
      >
        <div className="flex shrink-0 grow-0 items-center justify-center mb-6 md:mb-0">
          <ul data-v-fecf18ac="">
            <li
              className="title-stack-item inline-block pr-3 text-2xl text-gray-500 dark:text-gray-400 last:pr-0 last:font-black last:text-black "
              data-v-fecf18ac=""
            >
              Perfil
            </li>
            <li
              className="title-stack-item inline-block pr-3 text-2xl text-gray-500 dark:text-gray-400 last:pr-0 last:font-black last:text-black "
              data-v-fecf18ac=""
            >
              Administrador
            </li>
          </ul>
        </div>
      </div>
      <div className=" dark:bg-darktheme-body bg-white ">
        <div className="p-12">
          <div className="justify-around lg:justify-center items-center block md:flex">
            <div className="flex shrink-0 grow-0 items-center justify-center mb-6 md:mb-0">
              <div className="lg:mx-8">
                <img
                  src={getUser.avatar ? getUser.avatar : avatarNotFound}
                  alt="John Doe"
                  className="rounded-full block h-32 w-32 dark:bg-gray-800 bg-gray-100"
                />
              </div>
            </div>
            <div className="flex shrink-0 grow-0 items-center justify-center">
              <div className="space-y-3 text-center md:text-left lg:mx-12 dark:text-gray-500">
                <h1 className="text-2xl">
                  <b>{auth.name}</b>!
                </h1>
                <p>
                  Last login <b>12 mins ago</b> from <b>127.0.0.1</b>
                </p>
                <div className="flex justify-center md:block">
                  <div className="inline-flex items-center last:mr-0 capitalize border py-2 px-4 rounded-2xl mr-3 bg-blue-600 text-white border-blue-700">
                    <span className="inline-flex justify-center items-center w-4 h-4 mr-2">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        className="inline-block"
                      >
                        <path
                          fill="currentColor"
                          d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"
                        ></path>
                      </svg>
                    </span>
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="flex justify-center items-center">
        <form className="md:rounded border-gray-100 dark:bg-darktheme-navbar shadow-lg  w-11/12 md:w-3/4 ">
          <header className="border-gray-100 flex items-stretch border-b dark:border-gray-800">
            <p className="flex items-center py-3 grow font-bold px-4 text-gray-500">
              <span className="inline-flex justify-center items-center w-6 h-6 mr-3">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  className="inline-block"
                >
                  <path
                    fill="currentColor"
                    d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
                  ></path>
                </svg>
              </span>{' '}
              Cambiar contraseña
            </p>
            <a
              href="#"
              className="flex items-center py-3 px-4 justify-center ring-blue-700 focus:ring"
              aria-label="more options"
            >
              <span className="inline-flex justify-center items-center w-6 h-6">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  className="inline-block text-gray-500"
                >
                  <path
                    fill="currentColor"
                    d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                  ></path>
                </svg>
              </span>
            </a>
          </header>
          <div className="p-6">
            <div className="mb-6 last:mb-0">
              <label className="block font-bold mb-2 text-gray-500">
                Current password
              </label>
              <div className="">
                <div className="relative">
                  <input
                    name="password_current"
                    required=""
                    type="password"
                    className="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:text-gray-200 h-12 border bg-white dark:bg-gray-600 pl-10"
                  />
                  <span className="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-gray-400">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      className="inline-block"
                    >
                      <path
                        fill="currentColor"
                        d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Required. Your current password
              </div>
            </div>
            <hr className="border-gray-100 my-6 -mx-6 dark:border-gray-800 border-t" />
            <div className="mb-6 last:mb-0">
              <label className="block font-bold mb-2 text-gray-500">
                New password
              </label>
              <div className="">
                <div className="relative">
                  <input
                    name="password"
                    required=""
                    type="password"
                    className="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:text-gray-200 h-12 border bg-white dark:bg-gray-600 pl-10"
                  />
                  <span className="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-gray-400">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      className="inline-block"
                    >
                      <path
                        fill="currentColor"
                        d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20M8.5,12A1.5,1.5 0 0,0 7,10.5A1.5,1.5 0 0,0 5.5,12A1.5,1.5 0 0,0 7,13.5A1.5,1.5 0 0,0 8.5,12M13,10.89C12.39,10.33 11.44,10.38 10.88,11C10.32,11.6 10.37,12.55 11,13.11C11.55,13.63 12.43,13.63 13,13.11V10.89Z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Required. New password
              </div>
            </div>
            <div className="mb-6 last:mb-0">
              <label className="block font-bold mb-2 text-gray-500">
                Confirm password
              </label>
              <div className="">
                <div className="relative">
                  <input
                    name="password_confirmation"
                    autoComplete="off"
                    required=""
                    type="password"
                    className="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:text-gray-200 h-12 border bg-white dark:bg-gray-600 pl-10"
                  />
                  <span className="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-gray-400">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      className="inline-block"
                    >
                      <path
                        fill="currentColor"
                        d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20M8.5,12A1.5,1.5 0 0,0 7,10.5A1.5,1.5 0 0,0 5.5,12A1.5,1.5 0 0,0 7,13.5A1.5,1.5 0 0,0 8.5,12M13,10.89C12.39,10.33 11.44,10.38 10.88,11C10.32,11.6 10.37,12.55 11,13.11C11.55,13.63 12.43,13.63 13,13.11V10.89Z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Required. New password one more time
              </div>
            </div>
            <hr className="border-gray-100 my-6 -mx-6 dark:border-gray-800 border-t" />
            <div className="flex items-center justify-start flex-wrap -mb-3">
              <button
                disabled
                className="inline-flex cursor-pointer justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border rounded ring-blue-700 p-2 bg-blue-600 text-white border-blue-700 hover:bg-blue-700 mr-3 last:mr-0 mb-3"
                type="submit"
              >
                <span className="px-2">Cambiar contraseña</span>
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
