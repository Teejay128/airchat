import { FC } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../../firebase-config";
import { signInAnonymously, signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";


import Prompt from "../components/Prompt";

const cookie = new Cookies();

type userProps = {
  user: string;
  setUser: (user: string) => void;
};

const UserPage: FC<userProps> = ({ user, setUser }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const redirect = location.state?.from || "/room"

  const anonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
      const randomName = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        separator: " ",
        style: "capital",
      });
      setUser(randomName);
      cookie.set("user", randomName);
      navigate(redirect, { replace: true })
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

  if(searchParams.get("new")) {
    return (
      <Prompt
        text={"You need to sign in to proceed"}
        func={anonymousSignIn}
        btnText="Sign in"
      />
    )
  }

  return (
    <>
      <main className="flex-1 container mx-auto mt-4 p-6 bg-indigo-100/60 text-gray-800 rounded-lg shadow-md backdrop-blur-sm">
        <section className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
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

      <footer className="sticky bottom-0 z-50 bg-indigo-300 border-t border-gray-300 p-1 shadow-sm">
        {user ? (
          <Prompt
            text={`username: ${user}`}
            func={logOut}
            btnText="Sign Out"
          />
        ) : (
          <Prompt
            text="Create an anonymous account"
            func={anonymousSignIn}
            btnText="Sign In"
          />
        )}
      </footer>
    </>
  );
};

export default UserPage;
