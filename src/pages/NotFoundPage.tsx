import { FC } from "react"

const NotFoundPage: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-800 to-indigo-300 p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
            <h2 className="text-4xl font-extrabold text-red-600 mb-4">Error 404.5</h2>
            <p className="text-lg text-gray-700 mb-4">
            We found the page you were looking for, but we're keeping it a secret for now 😉
            </p>
            <p className="text-gray-600 mb-6">
            Just head back to the homepage. Shoo, shoo!
            </p>
            <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
            >
            Go Home
            </a>
        </div>
        </div>
    )
}

export default NotFoundPage