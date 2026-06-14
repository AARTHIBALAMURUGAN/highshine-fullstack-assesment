const express=require('express')
const auth=require('../Middleware/auth')
const router=express.Router();
const {createVisitor,getVisitorSummary,getVisitorTrend}=require('../Controller/visitorcontroller')
router.post('/visitor',createVisitor);
router.get('/getvisitor/summary',auth,getVisitorSummary)
router.get('/getvisitor/trend',auth,getVisitorTrend)

module.exports=router;
