const findOtherValue = (arr : string[],knownValue : string) : string | null => {
    for (let value of arr) {
        if (value !== knownValue) {
        return value;
        }
    }
    return null;
}

export default findOtherValue