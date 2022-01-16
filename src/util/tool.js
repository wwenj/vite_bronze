// import dayjs from 'dayjs'
export function getTime(){
    // return dayjs('2019-01-25').format('YYYY年MM月DD日 mm:ss')
    return new Date().toDateString
}
export function getName(){
    return '泛前端分享'
}