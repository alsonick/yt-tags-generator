export const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      className="flex items-center text-white bg-red-500 justify-center p-2 px-8 whitespace-nowrap w-fit h-12 font-semibold
        rounded outline-none border-2 border-red-600 focus:ring focus:ring-red-300
        duration-300"
      {...props}
    >
      {props.children}
    </button>
  );
};
