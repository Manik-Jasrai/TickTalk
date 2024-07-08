const findOtherValue = (arr : any[],knownValue : string) : any => {
    for (let value of arr) {
        if (value.username !== knownValue) {
        return value;
        }
    }
    return null;
}

export default findOtherValue