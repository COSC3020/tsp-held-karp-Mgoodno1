function tsp_hk(distance_matrix) {
    let l = distance_matrix.length;

    if (l === 0 || distance_matrix.some(row => row.length !== l)) {
        return 0;
    }
    if (l === 1) return 0;

    let temp = new Map();

    function min_distance(remainingCities, current) {
        if (!Array.isArray(remainingCities)) {
            throw new Error("remainingCities should be an array");
        }

        if (remainingCities.length === 0) {
            return 0;
        }

        const remainingCitiesStr = remainingCities.join(',');
        const tempkey = `${current}:${remainingCitiesStr}`;

        if (temp.has(tempkey)) {
            return temp.get(tempkey);
        }

        let min_dist = Infinity;

        for (let i = 0; i < remainingCities.length; i++) {
            const next = remainingCities[i];
            const newRemainingCities = [...remainingCities.slice(0, i), ...remainingCities.slice(i + 1)];
            const distance = distance_matrix[current][next] + min_distance(newRemainingCities, next);
            min_dist = Math.min(min_dist, distance);
        }
        temp.set(tempkey, min_dist);
        return min_dist;
    }
    let minTourDist = Infinity;

    for (let start = 0; start < l; start++) {
        let remainingCities = Array.from({ length: l }, (_, i) => i).filter(city => city !== start);
        minTourDist = Math.min(minTourDist, min_distance(remainingCities, start));
    }
    return minTourDist;
}
