import { render, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
import sinon from 'sinon';
import OrderEvaluate from '../orderEvaluate.vue';
// import _ from 'lodash';
import orderService from '../../../services/order';

let evaluateStub;
beforeEach(() => {
  evaluateStub = sinon.stub(orderService, 'evaluate');
});
afterEach(() => {
  evaluateStub.restore();
});

it('should show tips`评价成功` when add cart success', async done => {
  evaluateStub.returns(Promise.resolve('success'));

  const { findByTestId, getByTestId, getAllByText } = render(OrderEvaluate);

  await findByTestId('main-section');
  const submitButton = getAllByText('提交');
  await fireEvent.click(submitButton[0]);
  expect(getByTestId('operation-result')).toHaveTextContent('评价成功');
  done();
});

it('should show tips`订单不存在` when payment order id invalid', async done => {
  evaluateStub.returns(Promise.resolve('invalid'));

  const { findByTestId, getByTestId, getAllByText } = render(OrderEvaluate);

  await findByTestId('main-section');
  const submitButton = getAllByText('提交');
  await fireEvent.click(submitButton[0]);
  expect(getByTestId('operation-result')).toHaveTextContent('订单不存在');
  done();
});

it('should show tips`评价已提交，请稍后查看评价结果` when server unavailable', async done => {
  evaluateStub.returns(Promise.resolve('unavailable'));

  const { findByTestId, getByTestId, getAllByText } = render(OrderEvaluate);

  await findByTestId('main-section');
  const submitButton = getAllByText('提交');
  await fireEvent.click(submitButton[0]);
  expect(getByTestId('operation-result')).toHaveTextContent(
    '评价已提交，请稍后查看评价结果'
  );
  done();
});
