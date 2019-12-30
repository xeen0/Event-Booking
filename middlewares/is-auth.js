const jwt =require('jsonwebtoken')
module.exports =  (req ,res , next) => { 
    const authHead = req.get('Authorization')
    if(!authHead){
        req.isAuth = false
        return next()
    }
    const token = authHead.split(' ')[1]
    if(!token || token == ' '){
        req.isAuth = false
        return next()
    }
    let decodedToken
    try{
        decodedToken = jwt.verify(token ,'SECREAT_KEY')
   
    }
    catch(e){
        console.log(e)
        req.isAuth =false
        return next()
    }
    console.log(decodedToken)
    if(!decodedToken){
        req.isAuth =false
        return next()
    }
console.log(decodedToken)
    req.isAuth = true
    req.userId = decodedToken.userId
    return next()


}