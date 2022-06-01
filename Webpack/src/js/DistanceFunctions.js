console.log('second')
module.exports = {distance, sortByDistance};

function distance(p2, p1) {
    let yDist = p2.y - p1.y;
    let xDist = p2.x - p1.x;
    return Math.sqrt(Math.pow(yDist, 2) + Math.pow(xDist, 2));
}

function sortByDistance(myPt, points) {
    return points.sort(
        (pt1, pt2) => distance(pt1, myPt) - distance(pt2, myPt));
}

