const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')


const handleUserRouter = (req, res) => {
    const method = req.method
    
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {    
                set(req.sessionId, req.session)
                // set(req.sessionId, { username: 'zhagnsan', realname: 'zhangsan' })
                req.session.username = data.username
                req.session.realname = data.realname
                return new SuccessModel()
            } else {
                return new ErrorModel()
            }
        })
    }

    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(new SuccessModel({
    //             session: req.session
    //         }))
    //     } 
    //     return Promise.resolve(new ErrorModel('登录失败'))
    // }
}

module.exports = handleUserRouter