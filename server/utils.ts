export const makeRecordsFromMap = <K extends string, V>(map: Map<K, V>) => {
    const records: Record<K, V> = {} as Record<K, V>;
    map.forEach((value, key) => {
        records[key] = value;
    });
    return records;
};

export const makeMapFromRecords = <K extends string, V>(records: Record<K, V>) => {
    const map = new Map<K, V>();
    Object.entries(records).forEach(([key, value]) => {
        map.set(key as K, value as V);
    });
    return map;
};

export const uniqueId = (prefix: string) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = prefix + '_';
    while (id.length < 32) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
    }
    return id;
};
