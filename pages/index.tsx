import { SuggestedTags } from "../components/SuggestedTags";
import { Button } from "../components/Button";
import { Response } from "../types/response";
import type { NextPage } from "next";
import copy from "copy-to-clipboard";
import { Tag } from "../types/tag";
import { useState } from "react";
import "tippy.js/dist/tippy.css";
import Filter from "bad-words";
import Head from "next/head";

const Home: NextPage = () => {
  const [networkingError, setNetworkingError] = useState("");
  const [suggestedTitle, setSugeestedTitle] = useState("");
  const [inputError, setInputError] = useState("");
  const [copiedText, setCopiedText] = useState("Copy");
  const [loading, setLoading] = useState(false);
  const [tagsText, setTagsText] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  let baseTags: Tag[] = [];
  let basewords: string[] = [];
  let baseText = "";

  const filter = new Filter();

  // Transform the title into an array of tags seperated by a space.
  const generateBaseTags = () => {
    const word = title.split(" ");

    for (let i = 0; i < word.length; i++) {
      baseTags.push({ id: `${Math.random()}-${word[i]}`, text: word[i] });
    }
  };

  // Gets the tag title for each tag and store them in the base array.
  const getBaseTagTitles = () => {
    for (let i = 0; i < baseTags.length; i++) {
      basewords.push(baseTags[i].text);
    }
  };

  // Takes all the titles and transform them into a single string,
  const convertBaseTagsTitleToText = () => {
    baseText = basewords.join(", ").replaceAll(" ", "");
  };

  const convertTextToTags = (tt: string) => {
    const tags = tt.split(",");

    let t: Tag[] = [];

    for (let i = 0; i < tags.length; i++) {
      t.push({ id: `${Math.random()}-${tags[i]}`, text: tags[i] });
    }

    setTags(t);
    setLoading(false);
  };

  // Copies the text based tags to the clipboard.
  const copyToClipboard = () => {
    copy(tagsText);

    setCopiedText("Copied");

    setTimeout(() => {
      setCopiedText("Copy");
    }, 3000);
  };

  // Validates the title input field.
  const validateTheTitle = (title: string) => {
    if (!title.trim()) {
      setLoading(false);
      return setInputError("Please enter the title.");
    }

    if (filter.isProfane(title)) {
      setLoading(false);
      return setInputError("Bad word!");
    }
  };

  const reset = () => {
    setInputError("");
    setTitle("");
  };

  // Calls the API to generate all the tags
  const generateTags = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validateTheTitle(title);

    // Special characters regex expression.
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    // If the title contains special characters then hold from making the request.
    if (format.test(title)) {
      return setInputError("Please don't include special characters.");
    }

    // Reset the values every time we generate a new set of tags.
    reset();

    generateBaseTags();
    getBaseTagTitles();
    convertBaseTagsTitleToText();

    setLoading(true);

    const tags = baseText;

    // Makes the request to the API.

    fetch(`/api/tags?title=${encodeURIComponent(title)}`, {
      method: "POST",
      body: JSON.stringify({ tags }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: Response) => {
        // Handle any networking errors.
        if (!data.success && data.error) {
          setNetworkingError(data.error);
          setLoading(false);
          return;
        }

        // Success
        if (data.data.tags) {
          setTagsText(data.data.tags);
          setSugeestedTitle(data.data.title);
          convertTextToTags(data.data.tags);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deletes a tag with the specified id.
  const deleteTag = (id: string) => {
    const filteredTags = tags.filter((t) => t.id !== id);
    setTags(filteredTags);
  };

  return (
    <div className="flex flex-col bg-white items-center w-screen h-screen">
      <Head>
        <title>YouTube Tags Generator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col lg:w-1/2 w-[90%] items-center justify-center">
        <header className="text-center relative pt-20 mb-5">
          <h1 className="text-black text-3xl tracking-tight font-semibold">
            {title ? title : "YouTube Tags Generator"}
          </h1>
          <p className="text-gray-800 mt-5 text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero earum
            magnam cum deleniti ad quidem, quisquam praesentium voluptate
            commodi temporibus inventore sint qui cupiditate. Vel iusto adipisci
            voluptatum quas rem impedit assumenda quod. Quod, incidunt? Labore
            sint delectus incidunt numquam ipsa.
          </p>
        </header>
        <div className="flex flex-col items-center w-full border-b pb-10">
          <form onSubmit={generateTags} className="flex justify-between w-full">
            <input
              className="flex items-center justify-center h-12 p-2 px-4 bg-white border-2 rounded outline-none
            text-black font-semibold focus:ring focus:ring-red-500 duration-300 w-full"
              id="title"
              value={title}
              onChange={(e) => {
                setInputError("");
                setTitle(e.target.value);
              }}
              required={true}
              placeholder="Title"
              type="text"
            />

            <Button style={{ marginLeft: "1.25rem" }}>Generate Tags</Button>
          </form>
          <p className="ml-auto text-red-500 text-sm mt-2">
            {inputError && inputError}
          </p>
        </div>
        <div className="mt-5 w-full">
          {tags.length ? (
            <SuggestedTags
              tags={tags}
              title={suggestedTitle}
              copy={copyToClipboard}
              copyText={copiedText}
              maxLength={500}
              deleteTag={deleteTag}
            />
          ) : (
            <div className="mt-10">
              <h1 className="text-gray-300 font-semibold text-2xl">
                {loading
                  ? "Generating..."
                  : networkingError
                  ? networkingError
                  : "No generated tags"}
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
