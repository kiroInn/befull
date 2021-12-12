import sinon from 'sinon';
import _ from 'lodash';
import orderApi from '../../api/order';
import orderService, { PAYMENT_STATUS } from '../order';

let queryOrdersStub;
let paymentStub;

afterEach(() => {
  queryOrdersStub.restore();
});

it('should transform response score filed data', async done => {
  queryOrdersStub = sinon.stub(orderApi, 'queryOrders');

  queryOrdersStub.returns(
    Promise.resolve({
      data: _.map(Array(1), (value, index) => ({
        id: `food-${index}`,
        name: '饭爵大碗便当订单',
        price: '18.99',
        score: '16.11111',
      })),
    })
  );
  const orders = await orderService.getOrders();
  expect(orders[0].score).toEqual('16.11');
  done();
});

it('should return success when payment success', async done => {
  paymentStub = sinon.stub(orderApi, 'payment');

  paymentStub.returns(
    Promise.resolve({
      data: 'success',
    })
  );
  const result = await orderService.payment(1);
  expect(result).toEqual(PAYMENT_STATUS.success);
  done();
});

it('should return invalid when addCart foodId is invalid', async done => {
  paymentStub.returns(
    Promise.resolve({ error: { code: 1001, message: 'fid is invalid' } })
  );
  const result = await orderService.payment('not correct id');
  expect(result).toEqual(PAYMENT_STATUS.invalid);
  done();
});

it('should return unavailable when server is err', async done => {
  paymentStub.returns(
    Promise.resolve({
      error: { code: 1002, message: 'service unavailable, please retry later' },
    })
  );
  const result = await orderService.payment(1);
  expect(result).toEqual(PAYMENT_STATUS.unavailable);
  done();
});
