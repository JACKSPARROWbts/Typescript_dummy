import express ,{Application,Request,Response,NextFunction} from 'express';
const app:Application=express();
const mongoose=require('mongoose');
const ts= require('./server.ts');
const cors=require('cors');
app.use(cors());
mongoose.connect("mongodb://localhost:27017/database",{useUnifiedTopology:true,useNewUrlParser:true},(err:any,data:any)=>{
    if(err)throw err;
    console.log("Database Connected")
});
app.use(express.json());
app.get('/',async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    res.send("Hello world Ts")
    try{
        const variables=await ts.find();
        console.log(variables);
        res.send(variables);
    }
    catch(e){
        console.log(e);
    }
});
app.post('/',async(req:Request,res:Response):Promise<any>=>{
    const value=new ts({
        name:req.body.name,
        password:req.body.password
    })
    try{
       const a=await value.save();
       res.send(a);
    }catch(e){
        res.send(e);
    }
})
app.get('/:id',async(req:Request,res:Response):Promise<any>=>{
    try{
       const value=await ts.findById(req.params.id)
       res.send(value);
    }catch(e){
        res.send(e);
    }
})
app.listen(3001,()=>{
    console.log("server is running at 3001");
});