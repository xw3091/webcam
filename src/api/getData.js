import request from '@/utils/request'

export function fetchApi(query) {
    const data = query
    if (data.interface === 'query_pay_status') {
        return request({
            url: '/sjz_pay_api',
            method: 'post',
            data
        })
    } else {
        return request({
            url: '/sjz_business_api',
            method: 'post',
            data
        })
    }
}