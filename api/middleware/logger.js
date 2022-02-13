const logger= (req,res,next)=>{
    req.requestTime = Date.now()
    next()
}

module.exports= logger