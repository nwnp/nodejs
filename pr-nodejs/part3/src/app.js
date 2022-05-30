import fs from "fs";
import http from "http";
import { createApi } from "unsplash-js";
import fetch from "node-fetch";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

const unsplash = createApi({
  accessKey: "eqC1TuwW6Tb2A67ORFpt4NANnrhNz83SdBE_5nkCkio",
  fetch,
});

/**
 * @param {string} query
 */
async function searchImage(query) {
  const result = await unsplash.search.getPhotos({ query });
  if (!result.response) {
    throw Error("Failed to search image.");
  }

  const image = result.response.results[0];
  if (!image) {
    throw new Error("No image found.");
  }

  return {
    description: image.description || image.alt_description,
    url: image.urls.regular,
  };
}

/**
 * 이미지를 unsplash에서 검색하거나 이미 있다면 게시판 이미지를 리턴
 * @param {string} query
 */
async function getCachedImageOrSearchedImage(query) {
  const __dirname = path.resolve();
  const imageFilePath = path.resolve(__dirname, `../images/${query}`);

  // if (fs.existsSync(imageFilePath)) {
  //   return {
  //     message: `Returning cached image: ${query}`,
  //     stream: fs.createReadStream(imageFilePath),
  //   };
  // }

  const result = await searchImage(query);
  const resp = await fetch(result.url);

  await promisify(pipeline)(resp.body, fs.createWriteStream(imageFilePath));
  return {
    message: `Returning new image: ${query}`,
    stream: fs.createReadStream(imageFilePath),
  };
}

/**
 * @param {string} url
 */
function convertURLToQueryKeyword(url) {
  return url.slice(1);
}

// fetch가 뭔지 공부
const server = http.createServer((req, res) => {
  async function main() {
    if (!req.url) {
      res.statusCode = 400;
      res.end("Needs URL");
      return;
    }

    const query = convertURLToQueryKeyword(req.url);
    try {
      const { message, stream } = await getCachedImageOrSearchedImage(query);
      console.log(message);
      stream.pipe(res);
    } catch (error) {
      console.error(error);
      res.statusCode = 400;
      res.end();
    }
  }
  main();
});

server.listen(8080, () => {
  console.log("8080 포트에서 대기중");
});
