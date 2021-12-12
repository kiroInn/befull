module.exports = () => {
  const names = [
    '必胜客急宅送订单',
    '一点点（小寨店）订单',
    '饭爵大碗便当订单',
    '港式滑蛋饭订单',
  ];
  const orders = [];
  for (let index = 0; index < 8; index++) {
    const idx = Math.floor(Math.random() * names.length);
    orders.push({
      id: `order-${index + 1}`,
      name: names[idx],
      price: '18.99',
    });
  }


  return {
    'order-proposals': orders,
    default: { data: 'success' }
  };
};
