import { render, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
import sinon from 'sinon';
import Foods from '../foods.vue';
import _ from 'lodash'
import foodsService from '../../../services/foods';

let getFoodsStub;
let addCartStub;
beforeEach(() => {
  getFoodsStub = sinon.stub(foodsService, 'getFoods');
  addCartStub = sinon.stub(foodsService, 'addCart');
});
afterEach(() => {
  getFoodsStub.restore();
  addCartStub.restore();
});

it('should show 8 foods and display the food list', async (done) => {
  getFoodsStub.returns(

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
  getFoodsStub.returns(
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

// it('should show tips`好像出错了，请稍后再试` when server throw err', async (done) => {
//   getFoodsStub.threw('exception', 500);

//   const { findByTestId, getByTestId } = render(
//     Foods
//   );
//   await findByTestId('no-foods');
//   expect(getByTestId('no-foods')).not.toBeEmptyDOMElement();
//   expect(getByTestId('no-foods')).toHaveTextContent(
//     '好像出错了，请稍后再试'
//   );
//   done();
// });


it('should show tips`操作成功` when add cart success', async done => {
  getFoodsStub.returns(
    Promise.resolve(
      _.map(Array(8), (value, index) => ({
        id: `food-${index}`,
        name: '饭爵大碗便当',
        price: '18.99',
        score: Math.random() * 10 + 1,
      }))
    )
  );
  addCartStub.returns(Promise.resolve('success'));

  const { findByTestId, getByTestId, getAllByText } = render(Foods);

  await findByTestId('food-list');
  const addCartButton = getAllByText('加入购物车');
  await fireEvent.click(addCartButton[0]);
  expect(getByTestId('operation-result')).toHaveTextContent('操作成功');
  done();
});

it('should show tips`操作失败，当前餐品失效` when add cart success', async done => {
  getFoodsStub.returns(
    Promise.resolve(
      _.map(Array(8), (value, index) => ({
        id: `food-${index}`,
        name: '饭爵大碗便当',
        price: '18.99',
        score: Math.random() * 10 + 1,
      }))
    )
  );
  addCartStub.returns(Promise.resolve('invalid'));

  const { findByTestId, getByTestId, getAllByText } = render(Foods);

  await findByTestId('food-list');
  const addCartButton = getAllByText('加入购物车');
  await fireEvent.click(addCartButton[0]);
  expect(getByTestId('operation-result')).toHaveTextContent(
    '操作失败，当前餐品失效'
  );
  done();
});

it('should show tips`操作失败，请重试` when add cart success', async done => {
  getFoodsStub.returns(
    Promise.resolve(
      _.map(Array(8), (value, index) => ({
        id: `food-${index}`,
        name: '饭爵大碗便当',
        price: '18.99',
        score: Math.random() * 10 + 1,
      }))
    )
  );
  addCartStub.returns(Promise.resolve('unavailable'));

  const { findByTestId, getByTestId, getAllByText } = render(Foods);

  await findByTestId('food-list');
  const addCartButton = getAllByText('加入购物车');
  await fireEvent.click(addCartButton[0]);
  expect(getByTestId('operation-result')).toHaveTextContent(
    '操作失败，请重试'
  );
  done();
});


