import {sortOrderList} from "../constants/index.js";

export const parseSortParams = ({ sortBy, sortOrder }, fieldList) => {
    const parsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : sortOrderList[0];
    const parsedSortBy = fieldList.includes(sortBy) ? sortBy : fieldList[0];

    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder,
    };
}; 