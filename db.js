module.exports = () => {
  const names = [
    '必胜客急宅送',
    '一点点（小寨店）',
    '饭爵大碗便当',
    '港式滑蛋饭',
  ];
  const foods = [];
  for (let index = 0; index < 8; index++) {
    const idx = Math.floor(Math.random() * names.length);
    foods.push({
      id: `food-${index + 1}`,
      name: names[idx],
      price: '18.99',
      score: Math.random() * 10 + 1,
    });
  }

  return {
    'food-proposals': foods,
    cart: { data: 'success' },
    evaluation: { data: 'success' },
  };
};
