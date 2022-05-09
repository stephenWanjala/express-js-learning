
const express=require('express');
const { route } = require('express/lib/application');
const uuid = require('uuid');
const router =express.Router()
const members=require('../../Members')

// get all users
router.get('/',(req,res)=>{
    res.json(members)
})


// get single member
router.get('/:id',(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id))
    if(found){
        res.json(members.filter(member=>member.id===parseInt(req.params.id)))
    } else{
        res.status(400).json({
            message:`No member with the id of ${req.params.id}`
        })
    }
})


// create a member
router.post('/',(req,res)=>{
   const newMember={
       id:uuid.v4(),
       name:req.body.name,
       email:req.body.email,
       status:'active'
   }
   if(!newMember.name || !newMember.email){
       return res.status(400).json({
           msg:"please include a valid email"
       })
   }
   members.push(newMember)
   res.json(members)
    // res.redirect('/')
})

// update member
router.put('/:id',(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id))
    if(found){
        const updateMember=req.body
        members.forEach(member=>{
            if(member.id===parseInt(req.params.id)){
                member.name=updateMember.name?updateMember.name:member.name
                member.email=updateMember.email?updateMember.email:member.email
                res.json({message:"member updated",member})
            }
        })
    } else{
        res.status(400).json({message:`No member with an id of ${req.params.id}`})
    }
})
// delete a member

router.delete('/:id',(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id))
    if(found){
      res.json({msg:"member deleted",
        members:members.filter(member=>
            member.id!=parseInt(req.params.id))})  
    } else{
        res.status(400).json({message:`No member with the id of ${req.params.id}`})
    }
})
module.exports= router