function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const rarity = () => {
  if (getRandomInt(6) === 5) {
    return "uncommon";
  }
  if (getRandomInt(15) === 14) {
    return "rare";
  }
  return "common";
};

const cardSelector = () => {
  switch (rarity()) {
    case "common":
      return getRandomInt(26) + 1;
    case "uncommon":
      return getRandomInt(15) + 27;
    case "rare":
      return getRandomInt(9) + 42;
  }
};
const boosterpack = () => {
  return {
    one: cardSelector(),
    two: cardSelector(),
    three: cardSelector(),
    four: cardSelector(),
    five: cardSelector(),
  };
};

export default boosterpack;
