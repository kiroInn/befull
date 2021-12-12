import orderApi from '../api/order';
import _ from 'lodash';
export const EVALUATE_STATUS = {
    success: 'success',
    invalid: 'invalid',
    unavailable: 'unavailable',
};

export default {
    async evaluate(pid, data) {
        let result;
        try {
            const response = await orderApi.evaluate(pid, data);
            if (_.get(response, 'error.code') === 2001) {
                result = EVALUATE_STATUS.invalid;
            } else if (_.get(response, 'error.code') === 1002) {
                result = EVALUATE_STATUS.unavailable;
            } else {
                result = EVALUATE_STATUS.success;
            }
        } catch (err) {
            result = EVALUATE_STATUS.unavailable;
        }
        return result;
    },
};
