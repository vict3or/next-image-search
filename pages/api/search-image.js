import axios from "axios";

export default async function searchImages(req, res) {
  const api_key = process.env.PIXABAY_API_SECRET;
  const apiUrl = "https://pixabay.com/api/";
  const url = `${apiUrl}?key=${api_key}&per_page=24&q=${req.query.q}&page=${req.query.page}`;
  const response = await axios.get(url);
  res.send(response.data);
}
