import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res
      .status(404)
      .send({ success: false, error: "Unsuported request method." });
  }

  const tags = req.body.tags as string;
  const title = req.query.title;

  console.log(title);

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

  tagsInTextFormat = baseLevelTags
    .join(" ")
    .replaceAll(" ", ",")
    .replace(/[^.,a-zA-Z]/g, "")
    .replace(",,", "");

  const removeLastTraillingCommaInText = tagsInTextFormat[
    tagsInTextFormat.length - 1
  ].replace(/,\s*$/, "");

  console.log(removeLastTraillingCommaInText);

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
