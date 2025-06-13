import { FC, useRef } from "react";

import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

const NotFoundPage: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  return (
    <>
      <main className="flex-1 container mx-auto mt-4 p-6 bg-indigo-100/60 text-gray-800 rounded-lg shadow-md backdrop-blur-sm text-center">
        {/* 404 Error Message */}
        <section className="mb-6">
          <h1 className="text-5xl font-extrabold text-red-600 mb-2">
            Error 404.5
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            We *almost* found the page you were looking for...
          </p>
          <p className="text-base sm:text-lg text-gray-600">
            But we’re keeping it a secret for now 😉. In the meantime, why not
            head back to familiar territory?
          </p>
        </section>

        {/* Fun Suggestions */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Here’s what you can do:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Return Home:</strong> Get back to the main page and chat
              away.
            </li>
            <li>
              <strong>Check the URL:</strong> Maybe there was a typo. It happens
              to the best of us.
            </li>
            <li>
              <strong>Invite a Friend:</strong> Airchat is better with friends!
            </li>
          </ul>
        </section>

        {/* Developer Easter Egg (Optional) */}
        <section>
          <p className="text-sm text-gray-500 italic">
            If you're a dev and landed here... you know what’s coming next. 🧪
          </p>
        </section>
      </main>

      <footer className="p-1 bg-indigo-300 shadow-md sticky bottom-0 z-50">
        <Input
          placeholder="Click below to go back to safety"
          ref={inputRef}
          func={() => navigate("/")}
          btnText="Take Me Home"
          disabled={true}
        />
      </footer>
    </>
  );
};

export default NotFoundPage;
