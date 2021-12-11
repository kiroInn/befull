import { render } from '@testing-library/vue';
import '@testing-library/jest-dom';
import sinon from 'sinon';
import Foods from '../foods.vue';
import _ from 'lodash'
import foodsService from '../../../services/foods';

let stub;
beforeEach(() => {
  stub = sinon.stub(foodsService, 'getFoods');
});
afterEach(() => {
  stub.restore();
});

it('should show 8 foods and display the food list', async (done) => {
  stub.returns(

    Promise.resolve(_.map(Array(8), (value, index) => ({
      id: `food-${index}`,
      name: '饭爵大碗便当',
      price: '18.99',
      score: Math.random() * 10 + 1
    })))
  );

  const { findByTestId, getByTestId } = render(
    Foods
  );
  await findByTestId('food-list');
  expect(getByTestId('food-list')).not.toBeEmptyDOMElement();
  expect(getByTestId('food-list').childNodes.length).toEqual(8);
  done();
});

it('should show tips`暂未查询到餐品数据` when food list item is 0', async (done) => {
  stub.returns(
    Promise.resolve([])
  );

  const { findByTestId, getByTestId } = render(
    Foods
  );
  await findByTestId('no-foods');
  expect(getByTestId('no-foods')).not.toBeEmptyDOMElement();
  expect(getByTestId('no-foods')).toHaveTextContent(
    '暂未查询到餐品数据'
  );
  done();
});

it('should show tips`好像出错了，请稍后再试` when food list item is 0', async (done) => {
  stub.throws('exception', 500);

  const { findByTestId, getByTestId } = render(
    Foods
  );
  await findByTestId('no-foods');
  expect(getByTestId('no-foods')).not.toBeEmptyDOMElement();
  expect(getByTestId('no-foods')).toHaveTextContent(
    '好像出错了，请稍后再试'
  );
  done();
});
