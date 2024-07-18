const parsedNumber = (value, defaultValue) => {
    if (typeof value !== "string") return defaultValue;
  
    const parsedValue = parseInt(value);
    if (Number.isNaN(parsedValue))  return defaultValue;  
    return parsedValue;
};
export const parsePaginationParams = ({ page, perPage }) => {
    const parsedPage = parsedNumber(page, 1);
    const parsedPerPage = parsedNumber(perPage, 5);

    return {
        page: parsedPage,
        perPage: parsedPerPage,
        };
};