function generateShortenedUrl(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomPart = Array.from({ length: 6 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length)),
  ).join("");
  return randomPart;
}

export { generateShortenedUrl };
