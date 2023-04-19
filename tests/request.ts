import axios from 'axios'

const request = (url: string, method: string, headers?: any, data?: any): Promise<any> => {
    return axios({
        url,
        method,
        headers,
        data,
        validateStatus: () => true
    })
}

export {
    request
}
