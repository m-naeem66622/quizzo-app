// Shuffle an array using modern Fisher-Yates algorithm by Richard Durstenfeld
function shuffleArray([...arr] = []) {
  // Loop over the array from the last element to the second
  for (let i = arr.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    let j = Math.floor(Math.random() * (i + 1));
    // Swap array [i] with array [j]
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
}

export default shuffleArray;
