import { FC } from "react"

type buttonProps = {
    text: string;
    func: () => void;
    btnText: string
};

const Button: FC<buttonProps> = ({
    text,
    func,
    btnText
}) => {

    return (
        <div className="p-1 bg-indigo-300 shadow-md sticky bottom-0 z-50">
        <div className="flex flex-col gap-1">
            <p className="px-2 py-1.5 text-sm border border-gray-400 rounded-md bg-white text-black">
            {text}
            </p>
            <button
            onClick={func}
            className="w-full bg-indigo-800 text-white px-3 py-1.5 text-sm rounded-md hover:bg-indigo-700 active:bg-indigo-900 transition-colors duration-200"
            >
            {btnText}
            </button>
        </div>
        </div>
    )
}

export default Button