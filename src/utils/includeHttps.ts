function includeHttps(url: string): string {
  const startOfUrl = url.slice(0, 5);
  if (startOfUrl !== "https") {
    const newUrl = `https://${url}`;
    return newUrl;
  }
  return url;
}

export { includeHttps };
