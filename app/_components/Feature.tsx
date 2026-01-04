const Feature = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl leading-tight font-bold text-gray-900 sm:text-4xl">
            Features for Growth
          </h2>

          <p className="mt-4 text-lg text-gray-700">
            SpaceMeet helps teams work smarter with real-time collaboration and
            interactive whiteboards."
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900 text-violet-600">
              Team Collaboration
            </h3>

            <p className="mt-2 text-gray-700">
              Work together seamlessly in real-time.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900 text-violet-600">
              Secure Authentication
            </h3>

            <p className="mt-2 text-gray-700">
              Keep your workspace safe with modern, reliable login.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900 text-violet-600">
              Real-Time Document Editor
            </h3>

            <p className="mt-2 text-gray-700">
              Edit, share, and update without delays.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature;
