import { getStrapiURL } from "../pages/api/getStrapiMedia";

export function getStrapiMedia(url) {
  const imageUrl = url.startsWith("/")
    ? getStrapiURL(url)
    : url;
  return imageUrl;
}