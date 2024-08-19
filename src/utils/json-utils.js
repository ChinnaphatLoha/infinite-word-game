export const getJsonFromLocalStorage = (key) => {
    const reviver = (_, value) => {
        if (value && value.dataType === 'Map') {
            return new Map(value.value); // Convert array back to Map
        } else if (value && value.dataType === 'Set') {
            return new Set(value.value); // Convert array back to Set
        } else if (value && value.dataType === 'Date') {
            return new Date(value.value); // Convert string back to Date
        } else if (!value) {
            return null;
        } else if (!Array.isArray(value) && !Object.keys(value).length) {
            return null; // Return null for non-empty objects
        }
        // Add more conditions here for other data structures if needed
        return value; // Return value as is for all other types
    };

    const jsonString = localStorage.getItem(key);
    return jsonString ? JSON.parse(jsonString, reviver) : null;
};

export const setJsonToLocalStorage = (key, value) => {
    const replacer = (key, value) => {
        if (value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()) // Convert Map to array of key-value pairs
            };
        } else if (value instanceof Set) {
            return {
                dataType: 'Set',
                value: Array.from(value) // Convert Set to array
            };
        } else if (value instanceof Date) {
            return {
                dataType: 'Date',
                value: value.toISOString() // Convert Date to ISO string
            };
        }
        // Add more conditions here for other data structures if needed
        return value; // Return value as is for all other types
    };

    localStorage.setItem(key, JSON.stringify(value, replacer));
};