import { render, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
import sinon from 'sinon';
import Orders from '../orders.vue';
import _ from 'lodash';
import orderService from '../../../services/order';

let getOrdersStub;
let paymentStub;
beforeEach(() => {
  getOrdersStub = sinon.stub(orderService, 'getOrders');
  paymentStub = sinon.stub(orderService, 'payment');
});
afterEach(() => {
  getOrdersStub.restore();
  paymentStub.restore();
});

it('should show 8 orders and display the food list', async done => {
  getOrdersStub.returns(
    Promise.resolve(
      _.map(Array(8), (value, index) => ({
        id: `order-${index}`,
        name: '饭爵大碗便当订单',
        price: '18.99',
        score: Math.random() * 10 + 1,
      }))
    )
  );

  const { findByTestId, getByTestId } = render(Orders);
  await findByTestId('order-list');
  expect(getByTestId('order-list')).not.toBeEmptyDOMElement();
  expect(getByTestId('order-list').childNodes.length).toEqual(8);
  done();
});

it('should show tips`暂未查询到订单数据` when food list item is 0', async done => {
  getOrdersStub.returns(Promise.resolve([]));

  const { findByTestId, getByTestId } = render(Orders);
  await findByTestId('no-orders');
  expect(getByTestId('no-orders')).not.toBeEmptyDOMElement();
  expect(getByTestId('no-orders')).toHaveTextContent('暂未查询到订单数据');
  done();
});

it('should show tips`操作成功` when payment success', async done => {
  getOrdersStub.returns(
    Promise.resolve(
      _.map(Array(8), (value, index) => ({
        id: `order-${index}`,
        name: '饭爵大碗便当订单',
        price: '18.99',
        score: Math.random() * 10 + 1,
      }))
    )
  );
  paymentStub.returns(Promise.resolve('success'));

  const { findByTestId, getByTestId, getAllByText } = render(Orders);

  await findByTestId('order-list');
  const paymentButton = getAllByText('支付购买');
  await fireEvent.click(paymentButton[0]);
  expect(getByTestId('operation-result')).toHaveTextContent('操作成功');
  done();
});

it('should show tips`操作失败，当前餐品失效` when payment order id invalid', async done => {
  getOrdersStub.returns(
    Promise.resolve(
      _.map(Array(8), (value, index) => ({
        id: `order-${index}`,
        name: '饭爵大碗便当订单',
        price: '18.99',
        score: Math.random() * 10 + 1,
      }))
    )
  );
  paymentStub.returns(Promise.resolve('invalid'));

  const { findByTestId, getByTestId, getAllByText } = render(Orders);

  await findByTestId('order-list');
  const paymentButton = getAllByText('支付购买');
  await fireEvent.click(paymentButton[0]);
  expect(getByTestId('operation-result')).toHaveTextContent(
    '操作失败，当前订单失效'
  );
  done();
});

it('should show tips`操作失败，请重试` when payment unavailable', async done => {
  getOrdersStub.returns(
    Promise.resolve(
      _.map(Array(8), (value, index) => ({
        id: `order-${index}`,
        name: '饭爵大碗便当订单',
        price: '18.99',
        score: Math.random() * 10 + 1,
      }))
    )
  );
  paymentStub.returns(Promise.resolve('unavailable'));

  const { findByTestId, getByTestId, getAllByText } = render(Orders);

  await findByTestId('order-list');
  const paymentButton = getAllByText('支付购买');
  await fireEvent.click(paymentButton[0]);
  expect(getByTestId('operation-result')).toHaveTextContent('操作失败，请重试');
  done();
});
