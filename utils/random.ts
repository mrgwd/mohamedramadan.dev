export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomFloat = (min: number, max: number) =>
  (Math.random() * (max - min) + min).toFixed(2);
