type Props = {
    text: string;
    onClick?: () => void;
}

export default function DefaultButton({ text, onClick}: Props) {
    return (
        <button onClick={onClick} className="px-4 md:mr-6 mx-6 md:mx-0 cursor-pointer md:ml-6 z-30 py-2 font-sigmar bg-base-100 rounded-lg text-mainly-200 relative after:-z-20 after:absolute after:h-1 after:w-1 after:bg-mainly-300 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-500 after:transition-all after:duration-500 transition-all duration-500 text-2xl">
          {text}
        </button>
    );
}