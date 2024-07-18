import { typeList } from "../constants/index.js";

const parseBoolean = value => {
    if (typeof value !== "string") return null;
    
    if (!["true", "false"].includes(value)) return null;
    
    const parsedValue = Boolean(value);
    return parsedValue;
};

export const parseContactFilterParems = ({ contactType, isFavourite }) => {
    const parsedContactType = typeList.includes(contactType) ? contactType : null;
    const parsedIsFavourite = parseBoolean(isFavourite);
    return {
        contactType: parsedContactType,
        isFavourite: parsedIsFavourite,
    };
};