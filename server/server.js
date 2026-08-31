import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(express.json({limit:'1mb'}));
app.use(cookieParser());
app.set('trust proxy', 1);

const PORT = process.env.PORT || 3000;
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;

if (!ADMIN_PASSWORD_HASH || !JWT_SECRET) {
  console.error('Missing ADMIN_PASSWORD_HASH or JWT_SECRET environment variable.');
  process.exit(1);
}

const loginLimiter = rateLimit({windowMs:15*60*1000,max:10,standardHeaders:true,legacyHeaders:false});

function auth(req,res,next){
  try {
    const token=req.cookies.ln_admin;
    if(!token) return res.status(401).json({error:'Unauthorized'});
    const payload=jwt.verify(token,JWT_SECRET);
    if(payload.user!==ADMIN_USER) throw new Error('bad user');
    next();
  } catch { res.status(401).json({error:'Unauthorized'}); }
}

app.post('/api/login',loginLimiter,async(req,res)=>{
  const {username,password}=req.body||{};
  if(username!==ADMIN_USER || typeof password!=='string') return res.status(401).json({error:'Invalid credentials'});
  const ok=await bcrypt.compare(password,ADMIN_PASSWORD_HASH);
  if(!ok) return res.status(401).json({error:'Invalid credentials'});
  const token=jwt.sign({user:ADMIN_USER},JWT_SECRET,{expiresIn:'8h'});
  res.cookie('ln_admin',token,{httpOnly:true,secure:true,sameSite:'strict',maxAge:8*60*60*1000});
  res.json({ok:true});
});

app.post('/api/logout',(req,res)=>{res.clearCookie('ln_admin',{httpOnly:true,secure:true,sameSite:'strict'});res.json({ok:true});});
app.get('/api/me',auth,(req,res)=>res.json({user:ADMIN_USER}));

// Protected API for future project CRUD/storage integration.
app.get('/api/projects',auth,(req,res)=>res.json({projects:[]}));
app.post('/api/projects',auth,(req,res)=>res.status(501).json({error:'Project storage is not configured yet'}));

app.get('/api/health',(req,res)=>res.json({ok:true,service:'logic-nest-admin-api'}));
app.listen(PORT,()=>console.log(`Logic Nest Admin API listening on ${PORT}`));
