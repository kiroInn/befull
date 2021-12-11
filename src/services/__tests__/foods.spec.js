import sinon from 'sinon';
import _ from 'lodash'
import foodApi from '../../api/foods';
import foodService from '../foods';

let stub;
beforeEach(() => {
    stub = sinon.stub(foodApi, 'queryFoods');
});
afterEach(() => {
    stub.restore();
});

it('should transform response score filed data', async (done) => {
    stub.returns(
        Promise.resolve({
            data: _.map(Array(1), (value, index) => ({
                id: `food-${index}`,
                name: '饭爵大碗便当',
                price: '18.99',
                score: '16.11111'
            }))
        })
    );
    const foods = await foodService.getFoods()
    expect(foods[0].score).toEqual('16.11')
    done();
});
