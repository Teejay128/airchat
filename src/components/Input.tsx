import { FC, RefObject } from "react"

type inputProps = {
    placeholder: string;
    ref: RefObject<HTMLInputElement | null>;
    func: () => void;
    btnText: string
};

const Input: FC<inputProps> = ({
    placeholder,
    ref,
    func,
    btnText
}) => {

    return (
        <div className="p-1 bg-indigo-300 shadow-md sticky bottom-0 z-50">
        <div className="flex items-center gap-0.5">
            <input
            type="text"
            placeholder={placeholder}
            ref={ref}
            className="flex-1 px-2 py-1.5 text-sm border border-gray-400 rounded-l-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            required
            />
            <button
            onClick={func}
            className="bg-indigo-800 text-white px-3 py-1.5 text-sm rounded-r-md hover:bg-indigo-700 active:bg-indigo-900 transition-colors duration-200"
            >
            {btnText}
            </button>
        </div>
        </div>

    )
}

export default Input