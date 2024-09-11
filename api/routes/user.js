import express from 'express';

const router = express.Router();

router.get('/',(req,res) =>{
    res.status(200).json('good api response');
})

export default router;
