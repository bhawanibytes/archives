const { default: axios } = require("axios");

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

export const getVideos = async (query) => {
  const params = {
    part: "snippet",
    q: query,
    maxResults: 1,
    type: "video",
    key: "AIzaSyAU3Sdmcxf0KSApmA_xQlUKGk0GwId5m4M",
  };

  const res = await axios.get(YOUTUBE_BASE_URL + "/search", { params });

  return res.data.items;
};
