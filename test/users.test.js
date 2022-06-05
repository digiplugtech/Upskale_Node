//const express = require('express')


const app = require('../index');






const pin = null;

beforeAll((done) => {
    request(app)
      .post('/usersdetails')
      .send({
        "userphone":"9779300370",
        "userpassword":"abc"
    })
      .end((err, response) => {
        pin = response.body.smspin; // save the token!
        done();
      });
  });



/*
const callback = require('./callback');

test('Testing Call Back With Error', (done) => {

    callback('http://localhost:5000/tes', (err) => {
        
        expect(err).toEqual(Error("url is wrong"));
        done();
    })
});
test('Should return data', (done) => {
    const data= {userphone:"9779300370", userphone:"abc123"}
    const recordData={
        "success": true,
        "data": {
            "type": "login",
            "email": "saurabh.subham@gmail.com",
            "phonenumber": "9779300370",
            "smspin": 2505,
            "smsid": "61ebebb45fddcb2761ada37d",
            "smsdate": 1642851252
        }
    }
    callback('http://localhost:5000/api/v1/usersdetails', (err, data) => {
        
        expect(recordData).toEqual(recordData);
        done();
    })
});

*/



//import {createUser} from '../controllers/user.controller';

/*

describe("create user", () =>{
    it("create new User", ()=>{
        expect(createUser({
            "name":"saurabh",
            "email":"nisha@qortechno.com",
            "password": "abc123",
            "phonenumber":"9729311370",
            "experience": "0-2"
        }).toEqual({
            "success": true,
            "data": {
                "type": "register",
                "email": "nisha@qortechno.com",
                "phonenumber": "9729311370",
                "smspin": 7235,
                "smsid": "61eb54d1b1dd1fc17a5a8f65",
                "smsdate": 1642812625
            }
            
        })
        )
    })
})
*/
