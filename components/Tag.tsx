import { BiXCircle } from "react-icons/bi";

interface Props {
  id: string;
  title: string;
  deleteTag: (title: string) => void;
}

export const Tag = ({ id, title, deleteTag }: Props) => {
  return (
    <div
      className="flex items-center w-fit text-gray-800 justify-center p-2
      tracking-tight cursor-pointer float-left mr-3 mb-2 rounded-full px-3 shadow font-semibold hover:shadow-lg
      duration-300"
      onClick={() => deleteTag(id)}
    >
      {title
        .split("", 60)
        .reduce((o, c) => (o.length === 59 ? `${o}${c}...` : `${o}${c}`), "")}
      <BiXCircle className="ml-1 text-xl text-gray-800" />
    </div>
  );
};
