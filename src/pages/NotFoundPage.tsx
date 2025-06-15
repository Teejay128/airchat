import { FC } from "react";
import { useNavigate } from "react-router-dom";

import Prompt from "../components/Prompt";

const NotFoundPage: FC = () => {
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
        {/* Implement some no as a service something... */}

        {/* Developer Easter Egg (Optional) */}
        <section>
          <p className="text-sm text-gray-500 italic">
            If you're a dev and landed here... you know what’s coming next. 🧪
          </p>
        </section>
      </main>

      <footer className="sticky bottom-0 z-50 bg-indigo-300 border-t border-gray-300 p-1 shadow-sm">
        <Prompt
          text="Click here to go back to safety"
          func={() => navigate("/")}
          btnText="Take Me Home"
        />
      </footer>
    </>
  );
};

export default NotFoundPage;
