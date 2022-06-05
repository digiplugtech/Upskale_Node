
const config = {
    'local': {
        'serverpath':'http://localhost:5000',
        'serversubpath':'/api/v1',
        'server': {
            'sms_gateway_api_key':'7752440938601464872',
            'sms_gateway_url':'https://www.smsgateway.center/SMSApi/rest/send',
            'admin_token':'wdfhBIRDF8dgbsdnlIBGIR8945jnbIGJBsfdsdfGIgOWgkvIUFGBeriswgyONdhdfewRGBUi',
            'sendotp':true,
            'razorpay_key':'rzp_test_2IPLPGGdY2NfNQ',
            'razorpay_secret':'hPdzchOEj3Hx7vjmqj7VU4qA',
            //'database':'mongodb://127.0.0.1:27017/upskale-demo',
            'database':'mongodb+srv://nisha-upskale:Nisha%40%2309@upskale-demo.7vrli.mongodb.net/upskale-details?retryWrites=true&w=majority',
        },
        'programschema':{
            'schema':{
                'name' : {type:String, required: true, trim:true},
                'description': {type:String, required: true},
                'level':{type:Array, required:true},
                'type':{type:String, required:false, default:"personal"},
                'duration': {type:String, required:false, default:""},
                'rating':{type:Number, required:false, default:0},
                'enrollment':{type:Array, required:false, default:[]},
                'fees':{type:Number, required:true, default:0},
                'deliverymode':{type:String, required:false, default:""},
                'instructor':{type:Array, required:false},
                'module':{type:Array, required:false},
                'videos':{type:Array, required:false},
                'assignments': {type:Array, required:false},
                'start_date': {type:String, required:false, default:0},
                'end_date': {type:String, required:false, default:0},
                'completion_status':{type:Boolean, default:false},
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                type: Number,
                default: () => Math.floor(Date.now() / 1000)
                },
            },
            'name': 'program.dbs'
        },
        'courseschema':{
            'schema':{
                name: {type:String, required: true, trim:true},
                description: {type:String, required: true},
                duration: {type:String, required:true, default:""},
                level:{type:Array, required:true},
                rating:{type:Number, required:false, default:0},
                enrollment:{type:Array, required:false, default:[]},
                fees:{type:Number, required:true},
                deliverymode:{type:String, required:false},
                instructor:{type:Array, required:false},
                module:{type:Array, required:false},
                videos:{type:Array, required:false},
                assignments:{type:Array, required:false},
                programs:{type:Array, required:true},
                start_date:{type:String, required:false, default: 0},
                end_date :{type:String, required:false, default: 0},
                completion_status:{type:Boolean, default:false},
                
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                type: Number,
                default: () => Math.floor(Date.now() / 1000)
                },
            },
            'name': 'course.dbs'
            
        },
        'userschema':{
            'schema':{
                name: {type:String, required: true, trim:true},
                email: {type:String, required: true, trim:true},
                phonenumber:{type:Number, required: true},
                password: {type: String, required: true},
                experience:{type:String, required:false},
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
            },
            'name': 'user.db'
        },
        'orderschema':{
           'schema': {
                userid: {type:String, required: true, trim:true},
                products:{type:Array, required:false, default:[], trim:true},
                amount:{type:Number, required:true, trim:true},
                receipt:{type:String, required:true, trim:true},
                razor_order_id:{type:String, required:false},
                razor_transaction_id:{type:String, default:false},
                
                razor_signature:{type:String, required:false},
                status:{type:Boolean, required:false, default:false},
                
                created: {
                    type: Number,
                    default: () => Math.round(Date.now() / 1000)
                },
                updated: {
                    type: Number,
                    default: () => Math.round(Date.now() / 1000)
                },
            },
            'name': 'orders.dbs'
        },
        'instructorschema':{
            'schema':{
                firstname: {type:String, required: true, trim: true},
                lastname: {type:String, required: true, trim: true},
                email:{type:String, require:false, default:"", trim:true}, 
                description: {type:String, required: false},
                experience:{type:String, required:false},
                qualification: {type:String, required: false},
                image: {type:String, required: false, default:""},
                skills:{type:Array, required: false},
                programs:[{type: String, ref: 'programdetails' }],
                course:{type:Array, required: false},
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                
            },
            'name':'instructor.db'
        },
        'usersmsschema':{
            'schema':{
                userid: {type:String, required: true, trim: true},
                phonenumber: {type:Number, required: true, trim: true},
                smspin:{type:Number, require:true, trim:true}, 
                verified: {type:Boolean, required: false, default:false},
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                  type: Number,
                  default: () => Math.floor(Date.now() / 1000)
                },
            },
            'name':'usersms.dbs'
        },
        'faqschema':{
            'schema':{
                name: {type:String, trim: true, required: false},
                question: {type:String, required: true},
                answer: {type:String, required: true},
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                  type: Number,
                  default: () => Math.floor(Date.now() / 1000)
                },
            },
            'name':'faq.dbs'
        },
        'newsletterschema':{
            'schema':{
                email: {type:String, trim: true,required: true},
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                  type: Number,
                  default: () => Math.floor(Date.now() / 1000)
                },
            },
            'name':'newsletter.dbs'
        },
        'emailconfig':{
            'host': 'az1-ss36.a2hosting.com',
            'port': 465,
            'user': 'hello@qortechno.com',
            'password': 'Tech*&$45',
            'defaultAddress':'hello@qortechno.com',
            'fromAddress': 'hello@qortechno.com',
            'subject': "Successfully registered on Upskale",
            'defaultmsg': 'Congratulation!, You have successfully regsitered on upskale.com',
        },
        'orderemailmsg':{
            'subject':'Order successfull from Upskale',
            'description':`Hi, <br /><br /> Congratulation, You have successfully enrolled for the course.<br /> The details are as below <br />`,
        },
        'servermessage':{
            'user':{
                'alreadyRegistered': 'User is already Registered',
                'phoneNumber': 'Phoe Number must be 10-digit',
                'usernotfound':'User not found.',
                'mustinformation': 'You must provide details to update',
                'blankuser': 'User Details can not be left blank.',
                'updateuser': 'User updated!',
                'notcreated':'New User not created!',
                'notmatch':'Given Information does not match...',
                'notloginmatched': 'Enter the correct phone number and password',
                'cantphone': 'Phone Number can not be updated',
                'forgetusermsg':'You have recovered your credential, Check your email.',
                'deleteuser': 'User has been successfully deleted'
            },
            'newsletter':{
                'blankuser':'Email can not be left blank',
                'alreadyRegistered': 'You are already register for newsletter',
                'successful': 'You have successfully registerd for newsletter',
                'notcreated':'New newsletter not created!',
                
                'deleteuser': 'User has been successfully deleted'
            },
            'useremailmsg':{
                'registration':{
                    'subject':'User Registration',
                    'message': 'Congratulation, You have successfully registered.'
                },
                'forgetusr':{
                    'subject':'Forget password',
                    'message': 'Congratulation, You have recovered your credential.'
                },
                'news':{
                    'subject':'News Letter',
                    'message': 'Thank you for subscription for news letter.'
                }
            },
            'order':{
                'notfound':'Order not found.',
                'mustinformation': 'You must provide details to update',
                'orderUpdate': "Order has been successfully placed",
                'idmatch': 'Id is not matched',
                'deleteOrder':' Order has een successfully deleted'
            },
            'sms':{
                'smsexit': 'SMS already exists',
                'success': 'New SMS created!',
                'fail': 'New SMS not created!',
                'alreadyVerify': 'SMS Pin is already verified.',
                'successverfied': 'SMS Pin successfully verified',
                'pinexpired': 'SMS Pin is already expired',
            },
            'program':{
                'alreadyExists': 'Program is already created',
                'idmatch': 'Id is not matched',
                'errmsg': 'You must provide a program details',
                'success': 'New Program created!',
                'fail': 'New Program not created!',
                'updateerr':'You must provide details to update',
                'notfound': 'Program not found!',
                'updatesuccess':'Program updated!',
                'deleteprogram': 'Program deleted successfully.'
            },
            'course':{
                'alreadyExists': 'Course is already created',
                'idmatch': 'Id is not matched',
                'errmsg': 'You must provide a course details',
                'success': 'New course created!',
                'fail': 'New course not created!',
                'updateerr':'You must provide details to update',
                'notfound': 'Course not found!',
                'updatesuccess':'Course updated!',
                'deletecourse': 'Course deleted successfully.'
            },
            'instructor':{
                'errmsg': 'You must provide a instructor details',
                'idmatch': 'Id is not matched',
                'success': 'New Instructor created!',
                'fail': 'New Instruction not created!',
                'alreadyRegistered': 'Instructor is already Registered',
                'updateerr':'You must provide details to update',
                'notfound': 'Instructor not found!',
                'updatesuccess':'Instructor updated!',
                'deleteInstructor': 'Instructor deleted successfully.'
            },
            'faq':{
                'errmsg': 'You must provide a faq details',
                'idmatch': 'Id is not matched',
                'success': 'New FAQ created!',
                'fail': 'New FAQ not created!',
                'alreadyRegistered': 'FAQ is already Created',
                'updateerr':'You must provide details to update',
                'notfound': 'FAQ not found!',
                'updatesuccess':'FAQ updated!',
                'deletefaq': 'FAQ deleted successfully.'
            }
        }
    },
    'development':{
        'server': {
            'host':'http://plugpe-backend-2076708309.ap-south-1.elb.amazonaws.com',
            'port':5001,
            'secretOrKey':'secretplugpe',
            'sms_gateway_api_key':'7752440938601464872',
            'sms_gateway_url':'https://www.smsgateway.center/SMSApi/rest/send',
            'admin_token':'wdfhBIRDF8dgbsdnlIBGIR8945jnbIGJBsfdsdfGIgOWgkvIUFGBeriswgyONdhdfewRGBUi',
            'razorpay_key_id':'rzp_test_ulxdtswYJ88BOl',
            'razorpay_secret':'8QmCzORX7zlnboAqUjg10nGm',
            'logging':false,
            'sendotp':true
        },
    },
    'qa':{

    },
    'production':{
        'serverpath':'',
        'serversubpath':'/api/v1',
        'server': {
            'sms_gateway_api_key':'7752440938601464872',
            'sms_gateway_url':'https://www.smsgateway.center/SMSApi/rest/send',
            'admin_token':'wdfhBIRDF8dgbsdnlIBGIR8945jnbIGJBsfdsdfGIgOWgkvIUFGBeriswgyONdhdfewRGBUi',
            'sendotp':true,
            'razorpay_key':'rzp_test_2IPLPGGdY2NfNQ',
            'razorpay_secret':'hPdzchOEj3Hx7vjmqj7VU4qA',
            //'database':'mongodb://127.0.0.1:27017/upskale-demo',
            'database':'mongodb+srv://nisha-upskale:Nisha%40%2309@upskale-demo.7vrli.mongodb.net/upskale-details?retryWrites=true&w=majority',
        },
        'programschema':{
            'schema':{
                'name' : {type:String, required: true, trim:true},
                'description': {type:String, required: true},
                'level':{type:Array, required:true},
                'type':{type:String, required:false, default:"personal"},
                'duration': {type:String, required:false, default:""},
                'rating':{type:Number, required:false, default:0},
                'enrollment':{type:Array, required:false, default:[]},
                'fees':{type:Number, required:true, default:0},
                'deliverymode':{type:String, required:false, default:""},
                'instructor':{type:Array, required:false},
                'module':{type:Array, required:false},
                'videos':{type:Array, required:false},
                'assignments': {type:Array, required:false},
                'start_date': {type:String, required:false, default:0},
                'end_date': {type:String, required:false, default:0},
                'completion_status':{type:Boolean, default:false},
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                type: Number,
                default: () => Math.floor(Date.now() / 1000)
                },
            },
            'name': 'program.dbs'
        },
        'courseschema':{
            'schema':{
                name: {type:String, required: true, trim:true},
                description: {type:String, required: true},
                duration: {type:String, required:true, default:""},
                level:{type:Array, required:true},
                rating:{type:Number, required:false, default:0},
                enrollment:{type:Array, required:false, default:[]},
                fees:{type:Number, required:true},
                deliverymode:{type:String, required:false},
                instructor:{type:Array, required:false},
                module:{type:Array, required:false},
                videos:{type:Array, required:false},
                assignments:{type:Array, required:false},
                programs:{type:Array, required:true},
                start_date:{type:String, required:false, default: 0},
                end_date :{type:String, required:false, default: 0},
                completion_status:{type:Boolean, default:false},
                
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                type: Number,
                default: () => Math.floor(Date.now() / 1000)
                },
            },
            'name': 'course.dbs'
            
        },
        'userschema':{
            'schema':{
                name: {type:String, required: true, trim:true},
                email: {type:String, required: true, trim:true},
                phonenumber:{type:Number, required: true},
                password: {type: String, required: true},
                experience:{type:String, required:false},
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
            },
            'name': 'user.db'
        },
        'orderschema':{
           'schema': {
                userid: {type:String, required: true, trim:true},
                products:{type:Array, required:false, default:[], trim:true},
                amount:{type:Number, required:true, trim:true},
                receipt:{type:String, required:true, trim:true},
                razor_order_id:{type:String, required:false},
                razor_transaction_id:{type:String, default:false},
                
                razor_signature:{type:String, required:false},
                status:{type:Boolean, required:false, default:false},
                
                created: {
                    type: Number,
                    default: () => Math.round(Date.now() / 1000)
                },
                updated: {
                    type: Number,
                    default: () => Math.round(Date.now() / 1000)
                },
            },
            'name': 'orders.dbs'
        },
        'instructorschema':{
            'schema':{
                firstname: {type:String, required: true, trim: true},
                lastname: {type:String, required: true, trim: true},
                email:{type:String, require:false, default:"", trim:true}, 
                description: {type:String, required: false},
                experience:{type:String, required:false},
                qualification: {type:String, required: false},
                image: {type:String, required: false, default:""},
                skills:{type:Array, required: false},
                programs:[{type: String, ref: 'programdetails' }],
                course:{type:Array, required: false},
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                
            },
            'name':'instructor.db'
        },
        'usersmsschema':{
            'schema':{
                userid: {type:String, required: true, trim: true},
                phonenumber: {type:Number, required: true, trim: true},
                smspin:{type:Number, require:true, trim:true}, 
                verified: {type:Boolean, required: false, default:false},
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                  type: Number,
                  default: () => Math.floor(Date.now() / 1000)
                },
            },
            'name':'usersms.dbs'
        },
        'faqschema':{
            'schema':{
                name: {type:String, trim: true, required: false},
                question: {type:String, required: true},
                answer: {type:String, required: true},
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                  type: Number,
                  default: () => Math.floor(Date.now() / 1000)
                },
            },
            'name':'faq.dbs'
        },
        'newsletterschema':{
            'schema':{
                email: {type:String, trim: true,required: true},
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                  type: Number,
                  default: () => Math.floor(Date.now() / 1000)
                },
            },
            'name':'newsletter.dbs'
        },
        'emailconfig':{
            'host': 'az1-ss36.a2hosting.com',
            'port': 465,
            'user': 'hello@qortechno.com',
            'password': 'Tech*&$45',
            'defaultAddress':'hello@qortechno.com',
            'fromAddress': 'hello@qortechno.com',
            'subject': "Successfully registered on Upskale",
            'defaultmsg': 'Congratulation!, You have successfully regsitered on upskale.com',
        },
        'orderemailmsg':{
            'subject':'Order successfull from Upskale',
            'description':`Hi, <br /><br /> Congratulation, You have successfully enrolled for the course.<br /> The details are as below <br />`,
        },
        'servermessage':{
            'user':{
                'alreadyRegistered': 'User is already Registered',
                'phoneNumber': 'Phoe Number must be 10-digit',
                'usernotfound':'User not found.',
                'mustinformation': 'You must provide details to update',
                'blankuser': 'User Details can not be left blank.',
                'updateuser': 'User updated!',
                'notcreated':'New User not created!',
                'notmatch':'Given Information does not match...',
                'notloginmatched': 'Enter the correct phone number and password',
                'cantphone': 'Phone Number can not be updated',
                'forgetusermsg':'You have recovered your credential, Check your email.',
                'deleteuser': 'User has been successfully deleted'
            },
            'newsletter':{
                'blankuser':'Email can not be left blank',
                'alreadyRegistered': 'You are already register for newsletter',
                'successful': 'You have successfully registerd for newsletter',
                'notcreated':'New newsletter not created!',
                
                'deleteuser': 'User has been successfully deleted'
            },
            'useremailmsg':{
                'registration':{
                    'subject':'User Registration',
                    'message': 'Congratulation, You have successfully registered.'
                },
                'forgetusr':{
                    'subject':'Forget password',
                    'message': 'Congratulation, You have recovered your credential.'
                },
                'news':{
                    'subject':'News Letter',
                    'message': 'Thank you for subscription for news letter.'
                }
            },
            'order':{
                'notfound':'Order not found.',
                'mustinformation': 'You must provide details to update',
                'orderUpdate': "Order has been successfully placed",
                'idmatch': 'Id is not matched',
                'deleteOrder':' Order has een successfully deleted'
            },
            'sms':{
                'smsexit': 'SMS already exists',
                'success': 'New SMS created!',
                'fail': 'New SMS not created!',
                'alreadyVerify': 'SMS Pin is already verified.',
                'successverfied': 'SMS Pin successfully verified',
                'pinexpired': 'SMS Pin is already expired',
            },
            'program':{
                'alreadyExists': 'Program is already created',
                'idmatch': 'Id is not matched',
                'errmsg': 'You must provide a program details',
                'success': 'New Program created!',
                'fail': 'New Program not created!',
                'updateerr':'You must provide details to update',
                'notfound': 'Program not found!',
                'updatesuccess':'Program updated!',
                'deleteprogram': 'Program deleted successfully.'
            },
            'course':{
                'alreadyExists': 'Course is already created',
                'idmatch': 'Id is not matched',
                'errmsg': 'You must provide a course details',
                'success': 'New course created!',
                'fail': 'New course not created!',
                'updateerr':'You must provide details to update',
                'notfound': 'Course not found!',
                'updatesuccess':'Course updated!',
                'deletecourse': 'Course deleted successfully.'
            },
            'instructor':{
                'errmsg': 'You must provide a instructor details',
                'idmatch': 'Id is not matched',
                'success': 'New Instructor created!',
                'fail': 'New Instruction not created!',
                'alreadyRegistered': 'Instructor is already Registered',
                'updateerr':'You must provide details to update',
                'notfound': 'Instructor not found!',
                'updatesuccess':'Instructor updated!',
                'deleteInstructor': 'Instructor deleted successfully.'
            },
            'faq':{
                'errmsg': 'You must provide a faq details',
                'idmatch': 'Id is not matched',
                'success': 'New FAQ created!',
                'fail': 'New FAQ not created!',
                'alreadyRegistered': 'FAQ is already Created',
                'updateerr':'You must provide details to update',
                'notfound': 'FAQ not found!',
                'updatesuccess':'FAQ updated!',
                'deletefaq': 'FAQ deleted successfully.'
            }
        }
    },



}

module.exports = config["local"]
//module.exports = config[process.argv[2]]

