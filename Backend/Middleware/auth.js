const auth=(req,res,next)=>{
    const apiKey=req.headers['x-api-key'];
    if(!apiKey || apiKey !== process.env.API_KEY){
        return res.status(401).json({
            sucess:false,
            message:"Unauthorized.Valid x-api-key header required."
        })
    }
    next();

}
module.exports=auth;