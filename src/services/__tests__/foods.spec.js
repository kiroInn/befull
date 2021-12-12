import sinon from 'sinon';
import _ from 'lodash';
import foodApi from '../../api/foods';
import foodService, { ADD_CART_STATUS } from '../foods';

let queryFoodsStub;
let addCartStub;

afterEach(() => {
  queryFoodsStub.restore();
});

it('should transform response score filed data', async done => {
  queryFoodsStub = sinon.stub(foodApi, 'queryFoods');

  queryFoodsStub.returns(
    Promise.resolve({
      data: _.map(Array(1), (value, index) => ({
        id: `food-${index}`,
        name: '饭爵大碗便当',
        price: '18.99',
        score: '16.11111',
      })),
    })
  );
  const foods = await foodService.getFoods();
  expect(foods[0].score).toEqual('16.11');
  done();
});

it('should return success when add cart success', async done => {
  addCartStub = sinon.stub(foodApi, 'addCart');

  addCartStub.returns(
    Promise.resolve({
      data: 'success',
    })
  );
  const result = await foodService.addCart(1);
  expect(result).toEqual(ADD_CART_STATUS.success);
  done();
});

it('should return invalid when addCart foodId is invalid', async done => {
  addCartStub.returns(
    Promise.resolve({ error: { code: 1001, message: 'fid is invalid' } })
  );
  const result = await foodService.addCart('not correct id');
  expect(result).toEqual(ADD_CART_STATUS.invalid);
  done();
});

it('should return unavailable when server is err', async done => {
  addCartStub.returns(
    Promise.resolve({
      error: { code: 1002, message: 'service unavailable, please retry later' },
    })
  );
  const result = await foodService.addCart(1);
  expect(result).toEqual(ADD_CART_STATUS.unavailable);
  done();
});
