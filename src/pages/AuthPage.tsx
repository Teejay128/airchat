import { FC, useRef } from "react";
import { auth } from "../../firebase-config";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { signInAnonymously, signOut } from "firebase/auth";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";

import Input from "../components/Input";

const cookie = new Cookies();

type authProps = {
  user: string;
  setUser: (user: string) => void;
};

const AuthPage: FC<authProps> = ({ user, setUser }) => {
  const authRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/room";

  const anonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
      const randomName = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        separator: " ",
        style: "capital",
      });
      console.log(randomName);
      setUser(randomName);
      cookie.set("user", randomName);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      cookie.remove("user");
      setUser("");
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="flex-1 container mx-auto mt-4 p-6 bg-indigo-100/60 text-gray-800 rounded-lg shadow-md backdrop-blur-sm">
        <section className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome,{" "}
            <span className="text-indigo-700">{user || "Dear User"}</span>
          </h1>
          <p className="mt-1 text-base sm:text-lg text-gray-600">
            Sign in anonymously to join a room and start chatting right away.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
            After signing in, you can:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 max-w-md mx-auto">
            <li>Join rooms and meet others.</li>
            <li>Chat in real time with zero friction.</li>
            <li>Engage in topic-driven discussions.</li>
            <li>Explore more features as they roll out.</li>
          </ul>
          <p className="text-xs text-gray-600 mt-5 text-center">
            <span className="font-semibold">Info:</span> Anonymous sign-in gives
            you a random username so you can dive right in.
          </p>
        </section>

        {/* Extra section for admin management */}
      </main>

      <footer className="p-1 bg-indigo-300 shadow-md sticky bottom-0 z-50">
        {user ? (
          <Input
            placeholder={`username: ${user}`}
            ref={authRef}
            func={logOut}
            btnText="Sign Out"
            disabled={true}
          />
        ) : (
          <Input
            placeholder="Create an anonymous account"
            ref={authRef}
            func={anonymousSignIn}
            btnText="Sign In"
            disabled={true}
          />
        )}
      </footer>
    </>
  );
};

export default AuthPage;
