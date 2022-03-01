import path from 'path';
import {ipdetails,compress,expand,getip,hostdetails,iptodec} from './cn.js';
import {inorder,preorder,postorder} from "./tree.js"
import {infixToPrefix,infixToPostfix,preToPost} from "./stack.js";
import {knapSackprob,activities,JobScheduling} from "./greedy.js"
import enc from './enc.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import bp from 'body-parser';
import express from 'express';
const app = express();

app.use(express.static("public"));
app.use(bp.urlencoded({
  extended: true
}));
app.listen(process.env.PORT || 3000, function() {
  console.log("server started on port 3000");
});

app.get("/cn", function(req, res) {
  res.sendFile(__dirname+"/cn.html");
});

app.post("/ipdetail",function(req,res){
  var out=ipdetails(req.body.ip,req.body.mask);
  res.send(out);
})
app.get('/convert',function(req,res){
  console.log('hi');
})
app.post("/convert",function(req,res){
  var out=enc(req.body.cars,req.body.cars1,req.body.mask);
  res.send(out);
})
app.post("/compress",function(req,res){
  
  res.send(compress(req.body.domain));
})
app.post("/expand",function(req,res){
  console.log(req.body.do);
  res.send(expand(req.body.do));
})
app.post("/hostdetail",function(req,res){
  var out=hostdetails(req.body.ip);
  res.send(out);
})
app.post("/myip",function(req,res){
  var x=getip();
  console.log(x);
  res.send(x);
})
app.post("/i2i",function(req,res){
  var out=iptodec(req.body.ip);
  console.log(out);
  res.send(out.toString());
})


app.get("/dsa",function(req,res){
  res.sendFile(__dirname+"/dsa.html");
})

app.post("/inorder",function(req,res){
  var pre=req.body.pre;
  var post=req.body.post;
  res.send(inorder(pre,post).toString())
})
app.post("/postorder",function(req,res){
  var ino=req.body.in;
  var pre=req.body.pre;
  res.send(postorder(ino,pre).toString())
})
app.post("/preorder",function(req,res){
  var ino=req.body.in;
  var post=req.body.post;
  res.send(preorder(ino,post).toString())
})

app.post("/intopre",function(req,res){
  var ino=req.body.inp;
  res.send(infixToPrefix(ino));
})
app.post("/pretopost",function(req,res){
  var ino=req.body.inp;
  res.send(preToPost(ino));
})
app.post("/intopost",function(req,res){
  var ino=req.body.inp;
  res.send(infixToPostfix(ino));
})

app.post("/job",function(req,res){
  var ids=req.body.ids,
  profit=req.body.profit,
  dead=req.body.dead;
  var out=JobScheduling(ids,profit,dead);
  res.send(out.toString());
})

app.post("/knap",function(req,res){
  var knap=req.body.knap,
  weight=req.body.weight,
  value=req.body.value;
  var out=knapSackprob(value,weight,knap);
  console.log(out);
  res.send(out.toString());
})


app.post("/activity",function(req,res){
  var name=req.body.name,
  start=req.body.start,
  end=req.body.end;
  var out=activities(start,end);
  console.log(out);
  res.send(out);
})
