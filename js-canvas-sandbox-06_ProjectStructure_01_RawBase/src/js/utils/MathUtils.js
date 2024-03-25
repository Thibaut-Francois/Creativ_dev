export const deg2rad = (deg) => {
    return deg * Math.PI / 180
}

// pythagorean theorem
// here

export const randomRange = (min, max) => {
    const min_ = min > max ? max : min
    const max_ = max > min ? min : max
    return Math.random() * (max - min) + min
}