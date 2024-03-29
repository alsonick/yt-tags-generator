export const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <input
      className="flex items-center justify-center h-12 p-2 px-4 bg-white
      border-2 rounded outline-none text-black font-semibold
      focus:ring focus:ring-red-300 duration-300 w-full"
      {...props}
    />
  );
};
