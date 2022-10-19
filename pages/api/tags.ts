import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res
      .status(404)
      .send({ success: false, error: "Unsuported request method." });
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

  console.log(tags);

  let tagsInTextFormat = "";

  const baseLevelTags = tags.split(",");

  const first = [...baseLevelTags];
  const firstTag = first.join(" ").replaceAll(",", "");

  console.log(baseLevelTags);

  let validTagsThatCanBeCombined = [];

  for (let i = 0; i < baseLevelTags.length; i++) {
    if (baseLevelTags[i].length > 2) {
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

  console.log(tagsInTextFormat);

  res.status(200).send({
    success: true,
    data: {
      title,
      tags: `${firstTag.replace(",,", "")},${tagsInTextFormat}`.replace(
        /[^a-zA-Z0-9,\s]/g,
        ""
      ),
    },
  });
}
