import qs from 'querystring'
import { message } from 'antd'

export function fetchGet(url, params){
    return new Promise((resolve, reject) => {
        return fetch(url + "?" + qs.stringify(params))
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => {
                    message.error("서버 문제 있습니다!")
                })
    })
}

export function fetchPost(url, params){
    return new Promise((resolve, reject) => {
        return fetch(url, {
            method: "POST",
            headers:{
                'Content-Type':'application/json'
             },
             body:JSON.stringify(params)
        })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => {
                message.error("서버 문제 있습니다!")
            })
    })
}