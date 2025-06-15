import { FC, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Prompt from "../components/Prompt";

type homeProps = {
  user: string;
  room: string;
};

const HomePage: FC<homeProps> = ({ user, room }) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const contactMe = () => {
    console.log(room)
    if (!inputRef.current) return;
    const message = inputRef.current.value;

    // Message should be sent to me on this platform instead
    // send to whatsapp
    const link = `https://wa.me/+2347044529640?text=${message
      .split(" ")
      .join("+")}`;
    window.open(link, "_blank");
    inputRef.current.value = "";
  };

  return (
    <>
      <main className="flex-1 container mx-auto mt-4 p-6 bg-indigo-100/60 text-gray-800 rounded-lg shadow-md backdrop-blur-sm">
        {/* Title Section */}
        <section className="text-center mb-6">
          <h1 className="text-4xl font-bold text-indigo-700">Airchat</h1>
          <p className="mt-1 text-base sm:text-lg text-gray-600">
            Anonymous group chat for your close friends.
          </p>
        </section>

        {/* What is Airchat */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            What is Airchat?
          </h2>
          <p className="text-gray-700 mb-3">
            Airchat lets you speak your mind in private groups without revealing
            your identity.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Private Rooms:</strong> Share a link with only the people
              you trust.
            </li>
            <li>
              <strong>Anonymous Sharing:</strong> No usernames, no pressure —
              just conversation.
            </li>
            <li>
              <strong>Live Chat:</strong> Messages are sent and received in
              real-time.
            </li>
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Powered by Modern Tech
          </h2>
          <p className="text-gray-700 mb-3">
            Built using reliable and scalable technologies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>React:</strong> Fast, responsive UI.
            </li>
            <li>
              <strong>Firebase:</strong> Scalable, secure backend services.
            </li>
            <li>
              <strong>Firestore:</strong> Real-time chat updates.
            </li>
            <li>
              <strong>Auth:</strong> Anonymous and secure sign-ins.
            </li>
            <li>
              <strong>Genkit (Coming Soon):</strong> AI-powered enhancements on
              the way.
            </li>
          </ul>
        </section>

        {/* Developer Info */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Meet the Developer
          </h2>
          <p className="text-gray-700 mb-2">
            Hi, I’m <strong>Aribad</strong>, a backend dev and technical writer
            passionate about creating useful, intuitive tools.
          </p>
          <p className="text-gray-700">
            Connect with me on{" "}
            <a
              href="https://www.linkedin.com/in/joseph-taiwo-442a10233/"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
            ,{" "}
            <a
              href="https://github.com/Teejay128"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
            ,{" or "}
            <a
              href="https://wa.me/+2347044529640"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Whatsapp
            </a>
            .
          </p>
        </section>
      </main>

      <footer className="sticky bottom-0 z-50 bg-indigo-300 border-t border-gray-300 p-1 shadow-sm">
        {user ? (
          <Input
            placeholder="Send me a message..."
            ref={inputRef}
            func={contactMe}
            btnText="Send"
            disabled={false}
          />
        ) : (
          <Prompt
            text="Welcome to Airchat!"
            func={() => navigate("/user")}
            btnText="Get Started!"
          />
        )}
      </footer>
    </>
  );
};

export default HomePage;
