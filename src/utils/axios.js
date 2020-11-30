import axios from 'axios'

import {Message} from 'element-react'

async function analyzerResult(result, isMute) {
    if (result.status!==200) {
        !isMute && Message.error(result.reason || '服务器访问异常');
    }

    return result;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async post(url, data, isMute) { //  post
        const result = await axios({
            method: 'post',
            url,
            data: data || {}
        });
        return analyzerResult(result, isMute);
    },
    async get(url, params, isMute) { // get
        const result = await axios({
            method: 'get',
            url,
            params: params || {}, 
            timeout: 15000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        return analyzerResult(result, isMute);
    }
    
};