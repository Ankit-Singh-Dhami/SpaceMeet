import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const PricingDailog = () => {
  return (
    <DialogContent className="bg-white max-w-5xl w-full">
      <DialogHeader>
        <DialogTitle>Upgrade Plan</DialogTitle>

        {/* ✅ ONLY text here */}
        <DialogDescription className="text-sm">
          Choose the plan that best fits your needs
        </DialogDescription>
      </DialogHeader>

      {/* ✅ PRICING CONTENT MOVED OUT */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-stretch">
          {/* PRO PLAN */}
          <div className="rounded-2xl border border-indigo-600 p-6 ring-1 ring-indigo-600">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Pro <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-3">
                <strong className="text-3xl font-bold text-gray-900">
                  $30
                </strong>
                <span className="text-sm font-medium text-gray-700">
                  {" "}
                  /month
                </span>
              </p>
            </div>

            <ul className="mt-6 space-y-2 text-sm">
              {[
                "20 users included",
                "5GB of storage",
                "Email support",
                "Help center access",
                "Phone support",
                "Community access",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-8 block rounded-full bg-indigo-600 px-6 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700"
            >
              Get Started
            </a>
          </div>

          {/* STARTER PLAN */}
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Starter <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-3">
                <strong className="text-3xl font-bold text-gray-900">
                  $20
                </strong>
                <span className="text-sm font-medium text-gray-700">
                  {" "}
                  /month
                </span>
              </p>
            </div>

            <ul className="mt-6 space-y-2 text-sm">
              {[
                "10 users included",
                "2GB of storage",
                "Email support",
                "Help center access",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-8 block rounded-full border border-indigo-600 px-6 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      <DialogFooter>
        <DialogClose />
      </DialogFooter>
    </DialogContent>
  );
};

export default PricingDailog;

/* Check Icon */
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-5 text-indigo-700"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);
