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
const port = 5000;

const Organizer = require("./src/models/OrganizerSchema");
const Vendor = require("./src/models/VendorSchema");
const User = require("./src/models/UserSchema");
const Report = require("./src/models/ReportSchema");


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
let Vendors = "";
let Users = "";
let rfid_tags = "";
let reportCollection = "";

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        console.error(err)
        return
    } else {
        console.log("Connected to mongodb");
        const db = client.db('Eventify');
        Vendors = db.collection('vendors');
        Users = db.collection('users');
        rfid_tags = db.collection('rfid_tags');
        reportCollection = db.collection('report');
    }
});

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


//lead generation API
app.get("/getlead/:vendorId", function (req, res) {
    console.log("aaa", req.params.vendorId);
    Report.find({ "visitors.total_time": { "$gt": .5 }, vendor_id: Number(req.params.vendorId) }).then(list => {
        res.json({ message: "Report Found", result: list[0].visitors });
    })
});
// Report Generation API
app.get("/createreport", async function (req, res) {
    let vendorData = [];
    let rfidData = [];
    let userData = []
    let clear = await reportCollection.drop();
    let ven = await Vendors.find().toArray().then(data => {
        vendorData = data;
    });
    let rfid = await rfid_tags.find().toArray().then(data => {
        rfidData = data;
    });
    let user = await Users.find().toArray().then(data => {
        userData = data;
    });
    const rfidDa = await rfid_tags.find();
    const cursor = await Vendors.find();
    let document, newVendor;
    // const db1 = client.db('Eventify');
    // let result123 = await rfid_tags.aggregate(
    //     { $match: { "reader": readerNum } },
    //     {
    //         $group: {
    //             _id: "$id", "total_time": { $sum: "$timeDifference" }
    //         }
    //     },

    // );
    // console.log("result123", result123);
    while ((document = await cursor.next())) {
        let readerNum = document.rfid_reader_id;
        let organizer_id = document.organizer_id;
        let company_name = document.company_name;
        let vendor_type = document.vendor_type;
        let vendor_name = document.first_name + " " + document.last_name;
        if (readerNum !== null && readerNum !== "" && readerNum !== undefined) {
            newVendor = new Report({ vendor_id: readerNum, organizer_id: organizer_id, company_name: company_name, vendor_type: vendor_type, vendor_name: vendor_name });
            newVendor.save().then(async vendor => {
                const custCursor = await Users.find();
                let custDocument;
                while ((custDocument = await custCursor.next())) {
                    let cardNum = custDocument.rfid_id;
                    let custFirstName = custDocument.first_name;
                    let custEmail = custDocument.email;
                    console.log(cardNum);
                    let rfidCursor = await rfid_tags.find({ 'id': cardNum, 'reader': readerNum });
                    let rfidDocument;
                    let sum = 0;
                    while ((rfidDocument = await rfidCursor.next())) {
                        let diff = rfidDocument.timeDifference;
                        sum += diff;

                    }
                    console.log("sum :", sum);
                    if (sum > 0) {
                        Report.findOneAndUpdate(
                            { 'vendor_id': readerNum },
                            {
                                $push: {
                                    visitors: { card_number: cardNum, first_name: custFirstName, email: custEmail, total_time: sum }
                                }
                            }
                        ).then(re => console.log(JSON.stringify(re)));
                    }
                }
            }).then((response) => {
                res.json({ message: "Report Generated" });
            }).catch(err => {
                console.log("Error", err);
            });
            // console.log("jhjjhh");
        }

    }
});
//login for admin and organizers
app.post('/login', function (req, res) {
    console.log(req.body.email);
    Organizer.findOne({ email: req.body.email }).then(organizer => {
        if (!organizer) {
            return res.json({ authFlag: false, message: "Invalid Login Credentials" });
        }
        else {
            Bcrypt.compare(req.body.password, organizer.password).then(isMatch => {
                if (isMatch) {
                    if (organizer.type === "Admin") {
                        res.cookie("admin", organizer.email, { maxAge: 360000 });
                    }
                    if (organizer.type === "Organizer") {
                        res.cookie("organizer", organizer.email, { maxAge: 360000 });
                    }
                    res.json({
                        authFlag: true,
                        message: "",
                        first_name: organizer.first_name,
                        last_name: organizer.last_name,
                        email_id: organizer.email,
                        type: organizer.type
                    });
                } else {
                    res.json({ authFlag: false, message: "Invalid Login Credentials" });
                }
            }).catch(err => res.json(err));
        }
    })
});


app.post('/logout', function (req, res) {
    res.clearCookie('admin');
    res.clearCookie('organizer');
    console.log("cookie deleted");
    res.json({ message: "cookie deleted" });
});


//admin add event
app.post('/addEvent', function (req, res) {
    Organizer.findOne({ email: req.body.email }).then(organizer => {
        let password = req.body.password;
        if (organizer) {
            return res.json({ message: "Email Already Exists in Database" });
        }
        else {
            Bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                Bcrypt.hash(req.body.password, salt, (err, hash) => {
                    console.log("hash" + hash);
                    if (err) throw err;
                    password = hash;
                    const organizer = new Organizer({
                        "first_name": req.body.first_name,
                        "last_name": req.body.last_name,
                        "email": req.body.email,
                        "password": password,
                        "phone_num": req.body.phone_num,
                        "event_name": req.body.event_name,
                        "event_desc": req.body.event_desc,
                        "event_date_from": req.body.event_date_from,
                        "event_date_to": req.body.event_date_to,
                        "event_location": req.body.event_location,
                        "type": "Organizer"
                    });

                    organizer.save().then(() => {
                        console.log("Event inserted successfully");
                        res.json({ auth: true, message: "Event inserted successfully" });
                    }).catch(err => {
                        console.log("Error insereting record: " + err);
                    });
                })
            });
        }
    })
});


//admin delete event
app.post('/deleteEvent', function (req, res) {
    let emailid = req.body.email;
    Organizer.findOneAndDelete({ email: req.body.email }).then(organizer => {
        console.log("orggggggg" + organizer);
        Vendor.deleteMany({ organizer_id: emailid }).then(vendor => {
            res.json({ message: "Deleted" });
        }).catch(err => {
            console.log("Error deleting record: " + err);
        })
    }).catch(err => {
        console.log("Error deleting record: " + err);
    })

});


//admin get events
app.get('/events', function (req, res) {
    Organizer.find({}).then(organizer => {
        if (!organizer.length) {
            return res.json({ message: "No Events Found", result: [] });
        }
        else {
            res.json({ message: "Events Found", result: organizer });
        }
    })
});



//organizer get profile
app.get('/profile/:email', function (req, res) {
    Organizer.findOne({ email: req.params.email }).then(organizer => {
        if (!organizer) {
            return res.json({ message: "Profile Not Found" });
        }
        else {
            res.json({ message: "Profile Found", result: organizer });
        }
    })
});

//organizer update profile
app.post('/events/update', function (req, res) {
    console.log(req.body);
    Organizer.findOne({ email: req.body.email }).then(organizer => {
        if (!organizer) {
            res.json({ message: "Profile Not Found" });
        } else {
            Organizer.findOneAndUpdate({ email: req.body.email }, {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_num: req.body.phone_num,
                event_name: req.body.event_name,
                event_desc: req.body.event_desc
            }).then(organizer => {
                console.log("Updated");
                res.json({ message: "Profile Updated", first_name: req.body.first_name });
            }).catch(err => res.status(400).json(err));
        }
    })
});


//organizer add vendor
app.post('/addVendor', function (req, res) {
    Vendor.findOne({ email: req.body.email }).then(vendor => {
        if (vendor) {
            return res.status(500).json({ message: "Vendor Already Exists" });
        }
        else {
            const vendor = new Vendor({
                "organizer_id": req.body.organizer_id,
                "first_name": req.body.first_name,
                "last_name": req.body.last_name,
                "company_name": req.body.company_name,
                "email": req.body.email,
                "phone_num": req.body.phone_num,
                "vendor_type": req.body.vendor_type,
                "vendor_desc": req.body.vendor_desc,
                "rfid_reader_id": req.body.rfid_reader_id
            });

            vendor.save().then(() => {
                console.log("Vendor added successfully");
                res.status(200).json({ auth: true, message: "Vendor added successfully" });
            }).catch(err => {
                console.log("Error insereting record: " + err);
            });
        }
    })
});


//organizer get vendors
app.get('/vendor/:email', function (req, res) {
    Vendor.find({ organizer_id: req.params.email }).then(vendor => {
        if (!vendor.length) {
            console.log("no vendors");
            return res.json({ message: "No Vendors Found", result: [] });
        }
        else {
            console.log("vendors");
            console.log(vendor);
            res.json({ message: "Vendors Found", result: vendor });
        }
    })
});

//organizer update vendor info
app.post('/vendor/update', function (req, res) {
    Vendor.findOne({ email: req.body.email }).then(vendor => {
        if (!vendor) {
            res.json({ message: "Vendor Not Found" });
        } else {
            Vendor.findOneAndUpdate({ email: req.body.email }, {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                company_name: req.body.company_name,
                phone_num: req.body.phone_num,
                rfid_reader_id: req.body.rfid_reader_id,
                vendor_type: req.body.vendor_type,
                vendor_desc: req.body.vendor_desc
            }).then(vendor => {
                res.json({ message: "Vendor Profile Updated" });
            }).catch(err => res.status(400).json(err));
        }
    })
});

//organizer delete vendor
app.post('/deleteVendor', function (req, res) {
    Vendor.findOneAndDelete({ email: req.body.email }).then(vendor => {
        if (!vendor) {
            return res.json({ message: "Email Not found in database" });
        }
        else {
            res.json({ message: "Deleted" });
        }
    }).catch(err => {
        console.log("Error deleting record: " + err);
    })
});


//get organizer id for given organizer name
app.get('/getOrganizer/:event_name', function (req, res) {
    Organizer.find({ event_name: req.params.event_name }).then(report => {
        if (!report.length) {
            console.log("no report");
            return res.json({ message: "No report Found", result: [] });
        }
        else {
            console.log("report");
            console.log(report);
            res.json({ message: "Report Found", result: report });
        }
    })
});



//add user through online form
app.post('/addUser', function (req, res) {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(500).json({ message: "User with given email id already exists" });
        }
        else {
            Bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                Bcrypt.hash(req.body.password, salt, (err, hash) => {
                    console.log("hash" + hash);
                    if (err) throw err;
                    password = hash;
                    const user = new User({
                        "organizer_id": req.body.organizer_id,
                        "first_name": req.body.first_name,
                        "last_name": req.body.last_name,
                        "company_name": req.body.company_name,
                        "email": req.body.email,
                        "password": password,
                        "phone_num": req.body.phone_num,
                        "rfid_id": " "
                    });

                    user.save().then(() => {
                        console.log("User added successfully");
                        res.status(200).json({ message: "User added successfully" });
                    }).catch(err => {
                        console.log("Error insereting record: " + err);
                    });
                })
            });
        }
    })
});


//login for users
app.post('/loginUser', function (req, res) {
    console.log(req.body.email);
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.json({ authFlag: false, message: "Invalid Login Credentials" });
        }
        else {
            Bcrypt.compare(req.body.password, user.password).then(isMatch => {
                if (isMatch) {
                    res.json({
                        authFlag: true,
                        message: "Login Successful",
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email_id: user.email
                    });
                } else {
                    res.json({ authFlag: false, message: "Invalid Login Credentials" });
                }
            }).catch(err => res.json(err));
        }
    })
});


//reset password for organizers and users
app.post('/resetPassword', function (req, res) {
    console.log(req.body.email);
    Organizer.findOne({ email: req.body.email }).then(organizer => {
        if (!organizer) {
            User.findOne({ email: req.body.email }).then(user => {
                if (!user) {
                    return res.json({ message: "User Not Found" });
                }
                else {
                    Bcrypt.compare(req.body.password, user.password).then(isMatch => {
                        if (isMatch) {
                            Bcrypt.genSalt(10, (err, salt) => {
                                if (err) throw err;
                                Bcrypt.hash(req.body.new_password, salt, (err, hash) => {
                                    if (err) throw err;
                                    password = hash;
                                    User.updateOne({ email: req.body.email }, {
                                        password: password
                                    }).then(user => {
                                        res.json({ message: "Password updated successfully" });
                                    }).catch(err => res.status(400).json(err));
                                })
                            });
                        } else {
                            res.json({ message: "Wrong old password" });
                        }
                    }).catch(err => res.json(err));
                }
            })
        }
        else {
            Bcrypt.compare(req.body.password, organizer.password).then(isMatch => {
                if (isMatch) {
                    Bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw err;
                        Bcrypt.hash(req.body.new_password, salt, (err, hash) => {
                            if (err) throw err;
                            password = hash;
                            Organizer.updateOne({ email: req.body.email }, {
                                password: password
                            }).then(organizer => {
                                res.json({ message: "Password updated successfully" });
                            }).catch(err => res.status(400).json(err));
                        })
                    });
                } else {
                    res.json({ message: "Wrong old password" });
                }
            }).catch(err => res.json(err));
        }
    })
});


//organizer get report - top ten stalls
app.get('/report/topten/:email', function (req, res) {
    Report.find({ organizer_id: req.params.email, vendor_type: "Stall" }).sort({ "visitors": -1 }).limit(5).then(report => {
        if (!report.length) {
            console.log("no report");
            return res.json({ message: "No report Found", result: [] });
        }
        else {
            console.log("report");
            console.log(report);
            res.json({ message: "Report Found", result: report });
        }
    })
});

//organizer get report - top ten speakers
app.get('/report/toptenspeakers/:email', function (req, res) {
    Report.find({ organizer_id: req.params.email, vendor_type: "Speaker" }).sort({ "visitors": -1 }).limit(5).then(report => {
        if (!report.length) {
            console.log("no report");
            return res.json({ message: "No report Found", result: [] });
        }
        else {
            console.log("report");
            console.log(report);
            res.json({ message: "Report Found", result: report });
        }
    })
});


//organizer get report - all vendor data
app.get('/report/:email', function (req, res) {
    Report.find({ organizer_id: req.params.email }).then(report => {
        if (!report.length) {
            console.log("no report");
            return res.json({ message: "No report Found", result: [] });
        }
        else {
            console.log("report");
            console.log(report);
            res.json({ message: "Report Found", result: report });
        }
    })
});


//organizer get all users who attended
app.get('/usersAttended/:email', function (req, res) {
    console.log("dcyvsdcvsdiucviudsvcuisdvciuvsdiucvsdiucvdsiuc");
    User.find({ organizer_id: req.params.email, rfid_id: { $ne: " " } }).then(report => {
        if (!report.length) {
            console.log("no report");
            return res.json({ message: "No report Found", result: '' });
        }
        else {
            console.log("report");
            console.log(report);
            res.json({ message: "Report Found", result: report });
        }
    })
});

//organizers get all registered users
app.get('/users/:organizer_id', function (req, res) {
    User.find({ organizer_id: req.params.organizer_id }).then(report => {
        if (!report.length) {
            console.log("no report");
            return res.json({ message: "No report Found", result: [] });
        }
        else {
            console.log("report");
            console.log(report);
            res.json({ message: "Report Found", result: report });
        }
    })
});

//organizer update user's rfid id
app.post('/updateRfid', function (req, res) {
    console.log("organizer update user's rfid id", req.body)
    User.findOneAndUpdate({ email: req.body.email }, {
        rfid_id: req.body.rfid_number
    }).then(user => {
        console.log("Updated");
        res.json({ message: "Profile Updated" });
    }).catch(err => res.status(400).json(err));
});