function shuffleArray(array: string[]) {
  array.forEach((_, index) => {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const temp = array[index];
    array[index] = array[randomIndex];
    array[randomIndex] = temp;
  });
  return array;
}

export default shuffleArray;
