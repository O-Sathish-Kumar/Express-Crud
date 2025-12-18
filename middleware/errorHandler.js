const {ErrorCode} = require('../constant');

const errorMiddleware = (err,req,res,next)=>{
const statusCode = req.statusCode ? req.statusCode : 500;
// console.log(req.status,statusCode,ErrorCode.VALIDATION_ERROR);


        
switch(statusCode){
    case ErrorCode.VALIDATION_ERROR:
        res.json({
            'title':'Valiation Failed',
            'message':err.message,
            'stackTrace': err.stack,
        });
        break;
        
    case ErrorCode.UNAUTHORIZED:
        res.json({
            'title':'Unauthorized',
            'message':err.message,
            'stackTrace': err.stack,
        });
        break;
    case ErrorCode.FORBIDDEN:
        res.json({
            'title':'Forbidden',
            'message':err.message,
            'stackTrace': err.stack,
        });
        break;
    case ErrorCode.NOT_FOUND:
        res.json({
            'title':'Not Found',
            'message':err.message,
            'stackTrace': err.stack,
        });
        break;
    case ErrorCode.SERVER_ERROR:
        res.json({
            'title':'Server Error',
            'message':err.message,
            'stackTrace': err.stack,
        });
        break;
    default:
        console.log('No Error Working Fine');
        res.json({
            'title':'no Error',
        });
        break;
}

};

module.exports = errorMiddleware;