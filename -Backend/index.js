const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');
const Bcrypt = require("bcryptjs");
var mongo = require('mongodb');
let mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
let cookieParser = require('cookie-parser');
app.use(cookieParser()); 
const port = 3000;

const Organizer = require("./src/models/OrganizerSchema");
const Vendor = require("./src/models/VendorSchema");


// Connection URL
const url = 'mongodb+srv://root:root@cluster0-1enyv.mongodb.net/Eventify?retryWrites=true&w=majority';
 
// Database Name
const dbName = 'Eventify';
 

mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true); //issue with a depricated- found it
// mongoose.set("poolSize", 10);
mongoose
  .connect(url, { useNewUrlParser: true, poolSize: 10 })
  .then(() => console.log("Connected Successfully to MongoDB"))
  .catch(err => console.error(err));

  const db = mongoose.connection;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (res.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next();

})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});






//login for admin and organizers
app.post('/login', function(req,res){   

    Organizer.findOne({ email: req.body.email }).then(organizer => {
        if (!organizer) {
            return res.status(400).json({message:"Account Not Found"});
        }
        else{
            Bcrypt.compare(req.body.password, organizer.password).then(isMatch => {
                 if (isMatch) {
                     if(organizer.type==="Admin"){
                        res.cookie("admin", organizer.email, {maxAge: 360000});
                     }
                     if(organizer.type==="Organizer"){
                        res.cookie("organizer", organizer.email, {maxAge: 360000});
                     }
                    res.status(200).json({
                         authFlag: true,
                         message: "",
                         first_name: organizer.first_name,
                         last_name: organizer.last_name,
                         email_id: organizer.email,
                         type: organizer.type
                    });
                 }else{
                     res.json({authFlag:false, message:"Incorrect Email/Password"});
                 }
            }).catch(err => res.json(err));
        } 
    })
}); 



//admin add event
app.post('/addEvent', function(req,res){   
    Organizer.findOne({ email: req.body.email }).then(organizer => {
        let password=req.body.password;
        if (organizer) {
        return res.status(500).json({message:"Email Already Exists in Database"});
        } 
        else{
            Bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                Bcrypt.hash(req.body.password, salt, (err, hash) => {
                    console.log("hash"+hash);
                if (err) throw err;
                password = hash;
                const organizer = new Organizer({ 
                    "first_name": req.body.first_name, 
                    "last_name":req.body.last_name, 
                    "email":req.body.email, 
                    "password": password,
                    "phone_num":req.body.phone_num,
                    "event_name":req.body.event_name,
                    "event_desc":req.body.event_desc,
                    "event_date":req.body.event_date,
                    "event_location":req.body.event_location,
                    "type":"Organizer"
                });

                organizer.save().then(()=>{
                    console.log("Event inserted successfully");
                    res.status(200).json({message:"Event inserted successfully"});
                }).catch(err=>{
                    console.log("Error insereting record: "+err);
                });
    
                })
            });
        }
    })
}); 

//admin get events
app.get('/events', function(req,res){
    Organizer.find({}).then(organizer =>{
        if(!organizer){
            return res.json({message:"No Events Found"});
        }
        else{
            res.json({message:"Events Found", result:organizer});
        }
    })
});



//organizer get profile
app.get('/profile/:email', function(req,res){
    Organizer.findOne({email:req.params.email}).then(organizer =>{
        if(!organizer){
            return res.json({message:"Profile Not Found"});
        }
        else{
            res.json({message:"Profile Found", result:organizer});
        }
    })
});


app.post('/profile/update',function(req,res){
    Organizer.findOne({email:req.body.email}).then(organizer =>{
        if(!organizer){
            res.json({message:"Profile Not Found"});
        }else{
                const orgUpdate = new Organizer({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    phone_num: req.body.phone_num,
                    event_name: req.body.event_name,
                    event_desc: req.body.event_desc
                    });
                Organizer.findOneAndUpdate({email:req.body.email},{
                    first_name:orgUpdate.first_name,
                    last_name:orgUpdate.last_name,
                    phone_num:orgUpdate.phone_num,
                    event_name:orgUpdate.event_name,
                    event_desc:orgUpdate.event_desc
    
                }).then(organizer =>{
                    res.json({message:"Profile Updated"});
                }).catch(err => res.status(400).json(err));
                
            
            
        }
    })
});


//organizer add vendor
app.post('/addVendor', function(req,res){   
    Vendor.findOne({ email: req.body.email }).then(vendor => {
        if (vendor) {
        return res.status(500).json({message:"Vendor Already Exists"});
        } 
        else{
            const vendor = new Vendor({
                "organizer_id":req.body.organizer_id, 
                "first_name": req.body.first_name, 
                "last_name":req.body.last_name, 
                "email":req.body.email,
                "phone_num":req.body.phone_num,
                "vendor_type":req.body.vendor_type,
                "vendor_desc":req.body.vendor_desc
            });

            vendor.save().then(()=>{
                console.log("Vendor added successfully");
                res.status(200).json({message:"Vendor added successfully"});
            }).catch(err=>{
                console.log("Error insereting record: "+err);
            });
        }
    })
}); 


//organizer get vendors
app.get('/vendor/:email', function(req,res){
    Vendor.find({organizer_id:req.params.email}).then(vendor =>{
        if(!vendor){
            return res.json({message:"No Vendors Found"});
        }
        else{
            res.json({message:"Vendors Found", result:vendor});
        }
    })
});

//organizer update vendor info
app.post('/vendor/update',function(req,res){
    Vendor.findOne({email:req.body.email}).then(vendor =>{
        if(!vendor){
            res.json({message:"Vendor Not Found"});
        }else{
                const venUpdate = new Vendor({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    phone_num: req.body.phone_num,
                    rfid_reader_id: req.body.rfid_reader_id,
                    vendor_type: req.body.vendor_type,
                    vendor_desc: req.body.vendor_desc
                    });
                Vendor.findOneAndUpdate({email:req.body.email},{
                    first_name:venUpdate.first_name,
                    last_name:venUpdate.last_name,
                    phone_num:venUpdate.phone_num,
                    rfid_reader_id:venUpdate.rfid_reader_id,
                    vendor_type:venUpdate.vendor_type,
                    vendor_desc:venUpdate.vendor_desc
    
                }).then(vendor =>{
                    res.json({message:"Vendor Profile Updated"});
                }).catch(err => res.status(400).json(err));
        }
    })
});

