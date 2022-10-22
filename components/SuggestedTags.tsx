import { Tag as T } from "../types/tag";
import Tippy from "@tippyjs/react";
import { Button } from "./Button";
import { Tag } from "./Tag";

interface Props {
  deleteTag: (title: string) => void;
  maxLength: number;
  copyText: string;
  copy: () => void;
  title: string;
  tags: T[];
}

export const SuggestedTags = ({
  deleteTag,
  maxLength,
  copyText,
  copy,
  title,
  tags,
}: Props) => {
  let storedTagsTitle = [];

  for (let i = 0; i < tags.length; i++) {
    storedTagsTitle.push(tags[i].text);
  }

  let text = storedTagsTitle.join(",");

  return (
    <div className="flex flex-col text-center dark:bg-[#222222] grid-flow-row shadow-md rounded p-6">
      <h2 className="text-black dark:text-white m2-4 font-semibold tracking-tight text-xl">
        Suggested tags for{" "}
        {`"${title
          .trim()
          .split("", 50)
          .reduce(
            (o, c) => (o.length === 49 ? `${o}${c}...` : `${o}${c}`),
            ""
          )}"`}
      </h2>
      <div className="flex flex-wrap items-center gap-1 my-4">
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            id={tag.id}
            title={tag.text}
            deleteTag={deleteTag}
          />
        ))}
      </div>
      <Tippy
        content={text.length > maxLength ? "Too many characters!" : copyText}
        hideOnClick={false}
      >
        <div className="w-fit flex flex-col">
          <Button
            onClick={() => {
              if (text.length > maxLength) {
                alert("Too many characters!!");
                return;
              }
              copy();
            }}
          >
            Copy to Clipboard
          </Button>
          <p className="text-left text-sm text-gray-600 dark:text-gray-400 mt-4">
            {copyText === "Copied" ? "Copied to the clipboard!" : null}
          </p>
        </div>
      </Tippy>
      <p
        className={`text-sm ml-auto ${
          text.length > maxLength
            ? "text-red-500"
            : "text-gray-600 dark:text-gray-400"
        }`}
      >
        {text.length}/{maxLength}
      </p>
    </div>
  );
};
