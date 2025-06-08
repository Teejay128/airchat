import { FC } from "react";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie";
import { signInAnonymously, signOut } from "firebase/auth"; 
import { uniqueNamesGenerator, adjectives, animals } from "unique-names-generator";

import Button from "../components/Button";

const cookie = new Cookies();

type authProps = {
  user: string;
  setUser: (user: string) => void;
};

const AuthPage: FC<authProps> = ({ user, setUser }) => {
  const navigate = useNavigate()
  
  const anonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
      const randomName = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        separator: " ",
        style: "capital",
      });
      navigate("/room")
      setUser(randomName);
      cookie.set("user", randomName);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      cookie.remove("user");
      setUser("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-800 to-indigo-300">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-md shadow-md p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Welcome, <span className="text-indigo-600">{user || "Dear User"}</span>
          </h2>

          <section className="mt-4">
            <h3 className="text-lg font-semibold text-center text-gray-800 mb-3">
              After signing in, you can:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
              <li>Join rooms and meet others.</li>
              <li>Chat in real time with zero friction.</li>
              <li>Engage in topic-driven discussions.</li>
              <li>Explore more features as they roll out.</li>
            </ul>

            <p className="text-xs text-gray-600 mt-5 text-center">
              <span className="font-semibold">Info:</span> Anonymous sign-in gives you a random username so you can dive right in.
            </p>
          </section>
        </div>
      </div>

      {/* Sticky button footer */}
      <footer className="p-1 bg-indigo-300 shadow-md sticky bottom-0 z-50">
        {user ? (
          <Button text={`username: ${user}`} func={logOut} btnText="Sign Out" />
        ) : (
          <Button
            text="Click below to sign in anonymously and start chatting!"
            func={anonymousSignIn}
            btnText="Sign In"
          />
        )}
      </footer>
    </div>
  );
};

export default AuthPage;
