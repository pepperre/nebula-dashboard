const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let serverState = 'Offline';

app.get('/status',(req,res)=>{
    res.json({status:serverState});
});

app.post('/start',(req,res)=>{
    if(serverState==='Offline'){
        serverState='Starting';
        setTimeout(()=>{ serverState='Online'; },3000);
        return res.json({message:'Server starting...'});
    }
    res.json({message:'Server already running or starting.'});
});

app.post('/stop',(req,res)=>{
    if(serverState==='Online'){
        serverState='Stopping';
        setTimeout(()=>{ serverState='Offline'; },3000);
        return res.json({message:'Server stopping...'});
    }
    res.json({message:'Server not online.'});
});

app.listen(port,()=>console.log(`Backend listening on port ${port}`));
