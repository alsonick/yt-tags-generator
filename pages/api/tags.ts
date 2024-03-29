import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res
      .status(404)
      .send({ success: false, error: "Unsupported request method." });
  }

  const tags = req.body.tags as string;
  const title = req.query.title;

  if (!title) {
    return res
      .status(400)
      .send({ success: false, error: "Please provide the title." });
  }

  if (!tags) {
    return res
      .status(400)
      .send({ success: false, error: "Please provide tags." });
  }

  console.log(tags); // this

  let tagsInTextFormat = "";

  const baseLevelTags = tags.split(",");

  const first = [...baseLevelTags];
  const firstTag = first.join(" ").replaceAll(" ", ",");

  let validBaseTags = [];

  for (let i = 0; i < baseLevelTags.length; i++) {
    if (baseLevelTags[i].length > 2) {
      validBaseTags.push(baseLevelTags[i]);
    }
  }

  const validBaseTagsInTextFormat = validBaseTags
    .join(" ")
    .replaceAll(" ", ",");

  console.log(validBaseTagsInTextFormat);

  let validTagsThatCanBeCombined = [];

  for (let i = 0; i < baseLevelTags.length; i++) {
    if (baseLevelTags[i].length >= 3) {
      validTagsThatCanBeCombined.push(baseLevelTags[i]);
    } else {
      continue;
    }
  }

  let combined = [];

  for (let i = 0; i < validTagsThatCanBeCombined.length; i++) {
    for (let j = 0; j < validTagsThatCanBeCombined.length; j++) {
      if (validTagsThatCanBeCombined[i] == validTagsThatCanBeCombined[j]) {
        continue;
      }
      combined.push(
        `${validTagsThatCanBeCombined[i]} ${validTagsThatCanBeCombined[j]}`
      );
    }
  }

  for (let i = 0; i < combined.length; i++) {
    tagsInTextFormat += `${combined[i]},`;
  }

  const resultingTags = tagsInTextFormat.split(",");

  let tagsFixedLength = [];
  let letterCount = 0;

  for (let i = 0; i < resultingTags.length; i++) {
    if (
      letterCount +
        firstTag.replace(",,", "").length +
        validBaseTagsInTextFormat.length >
      450
    ) {
      break;
    }
    tagsFixedLength.push(resultingTags[i]);
    for (let j = 0; j < resultingTags[i].length; j++) {
      letterCount += 1;
    }
  }

  const tagsText = tagsFixedLength.join(",");

  console.log(firstTag);

  res.status(200).send({
    success: true,
    data: {
      title,
      tags:
        `${firstTag.replaceAll(
          ",",
          " "
        )},${validBaseTagsInTextFormat},${tagsText}`
          .replace(/[^a-zA-Z0-9,\s]/g, "")
          .slice(0, -1) + "",
    },
  });
}
