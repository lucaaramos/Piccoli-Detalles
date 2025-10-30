export const logger = (message, type = "info") => {
  const time = new Date().toISOString();
  console.log(`[${type.toUpperCase()}] ${time} - ${message}`);
};
