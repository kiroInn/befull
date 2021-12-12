import sinon from 'sinon';
import _ from 'lodash';
import orderApi from '../../api/order';
import orderService, { EVALUATE_STATUS } from '../order';

let evaluateStub;
beforeEach(() => {
  evaluateStub = sinon.stub(orderApi, 'evaluate');
});
afterEach(() => {
  evaluateStub.restore();
});
it('should return success when evaluate order success', async done => {

  evaluateStub.returns(
    Promise.resolve({
      data: 'success',
    })
  );
  const result = await orderService.evaluate(1, {
    merchant: {
      content: '非常好',
    },
    delivery: {
      content: '非常快',
    },
  });
  expect(result).toEqual(EVALUATE_STATUS.success);
  done();
});

it('should return invalid when evaluate orderId is invalid', async done => {
  evaluateStub.returns(
    Promise.resolve({ error: { code: 2001, message: 'fid is invalid' } })
  );
  const result = await orderService.evaluate('not correct id', {
    merchant: {
      content: '非常好',
    },
    delivery: {
      content: '非常快',
    },
  });

  expect(result).toEqual(EVALUATE_STATUS.invalid);
  done();
});

it('should return unavailable when server is err', async done => {
  evaluateStub.returns(
    Promise.resolve({
      error: { code: 1002, message: 'service unavailable, please retry later' },
    })
  );
  const result = await orderService.evaluate(1, {
    merchant: {
      content: '非常好',
    },
    delivery: {
      content: '非常快',
    },
  });
  expect(result).toEqual(EVALUATE_STATUS.unavailable);
  done();
});
