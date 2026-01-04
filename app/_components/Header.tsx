"use client";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-teal-600 dark:text-teal-600" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path />
              </svg>
            </a>
          </div>

          {/* Nav */}
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                {[
                  "About",
                  "Careers",
                  "History",
                  "Services",
                  "Projects",
                  "Blog",
                ].map((item) => (
                  <li key={item}>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                      href="#"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <LoginLink
                postLoginRedirectURL="/dashboard"
                className="rounded-md bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:hover:bg-violet-500"
              >
                Login
              </LoginLink>

              <RegisterLink className="hidden sm:flex rounded-md bg-violet-100 px-5 py-2.5 text-sm font-medium text-violet-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                Register
              </RegisterLink>
            </div>

            <div className="block md:hidden">
              <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
