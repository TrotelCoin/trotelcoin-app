export const round = (number: number, decimals: number) => {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const roundPrice: number = (price: number | null) => {
  if (price === 0 || !price) {
    return 0;
  }

  if (price > 1) {
    return Math.round(price);
  } else if (price > 0.1) {
    return round(price, 1);
  } else if (price > 0.01) {
    return round(price, 2);
  } else if (price > 0.001) {
    return round(price, 3);
  } else if (price > 0.0001) {
    return round(price, 4);
  } else if (price > 0.00001) {
    return round(price, 5);
  } else if (price > 0.000001) {
    return round(price, 6);
  } else {
    return round(price, 7);
  }
};
