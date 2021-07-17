const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("../config/key.js");

router.get("/hello", (req, res) => {
  res.json({ success: true, message: "hello :)" });
});

const baseUrl = "https://www.googleapis.com/youtube/v3";

const commonFunc = (url, optionParams) => {
  for (let option in optionParams) {
    url += option + "=" + optionParams[option] + "&";
  }

  // 마지막 & 없애기
  url = url.substr(0, url.length - 1);

  return url;
};

router.post("/searchList", (req, res) => {
  let url = `${baseUrl}/search?`;

  const q = encodeURI(req.body.q);

  const optionParams = {
    q,
    part: "snippet",
    regionCode: "KR",
    key: config.key,
    maxResults: 20,
  };

  url = commonFunc(url, optionParams);

  axios
    .get(url)
    .then(({ data }) => {
      res.json({ success: true, data });
    })
    .catch((err) => console.log(err));
});

router.get("/mostPopularVideoList", (req, res) => {
  let url = `${baseUrl}/videos?`;

  const optionParams = {
    part: "snippet, statistics, player",
    chart: "mostPopular",
    regionCode: "KR",
    key: config.key,
    maxResults: 20,
  };

  url = commonFunc(url, optionParams);

  axios
    .get(`${url}`)
    .then(({ data }) => {
      return res.json({ success: true, data });
    })
    .catch((err) => console.log(err));
});

router.post("/recommendedList", (req, res) => {
  let url = `${baseUrl}/videos?`;

  const optionParams = {
    part: "snippet",
    chart: "mostPopular",
    regionCode: "KR",
    videoCategoryId: req.body.category,
    maxResults: 20,
    key: config.key,
  };

  url = commonFunc(url, optionParams);

  axios
    .get(url)
    .then(({ data }) => {
      return res.json({ success: true, data });
    })
    .catch((err) => console.log(err));
});

// 끝

router.post("/searchListInVideo", (req, res) => {
  let url = `${baseUrl}/videos?`;

  const optionParams = {
    part: "snippet, statistics, player",
    id: req.body.id,
    key: config.key,
  };

  url = commonFunc(url, optionParams);

  axios
    .get(url)
    .then(({ data }) => {
      return res.json({ success: true, data });
    })
    .catch((err) => console.log(err));
});

router.post("/channelInfo", async (req, res) => {
  try {
    let url = `${baseUrl}/channels?`;

    const channelInfo = [];
    await Promise.all(
      await req.body.ids.map(async (item) => {
        const optionParams = {
          part: "snippet, statistics",
          id: item.channel,
          key: config.key,
        };

        url = await commonFunc(url, optionParams);

        const { data } = await axios.get(url);

        channelInfo.push({
          data,
          index: item.index,
        });
      })
    );

    // index 기준 내림차순
    channelInfo.sort((a, b) => {
      return a.index - b.index;
    });

    return res.json({ success: true, channel: channelInfo });
  } catch (err) {
    return res.json({ success: false, err });
  }
});

module.exports = router;
