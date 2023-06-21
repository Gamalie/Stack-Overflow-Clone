import request from 'supertest'
import {describe, it, expect} from 'vitest'
import app from './server'
import { response } from 'express'



// add user success
describe('Add User',()=>{

    it.skip('Should add a new user',()=>{
        return  request(app).post('/user').expect('Content-Type', /json/)
        .expect(201).
        send({
            "Name": "Achieno",
            "Email": "belinda@gmail.com",
            "Password": "Belinda@1"

        }).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('User registered successfully')
                }))
        })
    })


    //deny user whose full name is less that 4 characters
    it('Should deny to register user whose full name is lower than 4 characters',()=>{
        return request(app).post('/user').expect('Content-Type',/json/).expect(500).
        send({
            "Name": "Muc",
            "Email": "muchokiesther8@gmail.com",
            "Password": "Essmuch@1"
        }).then((response:request.Response)=>{
            expect(response.body).toEqual(expect.objectContaining({
                code:expect.stringContaining('ERR_HTTP_INVALID_STATUS_CODE')
            }))
        })
    })

  //deny user whose email format is not standard
    it('Should deny user to register without email',()=>{
        return request(app).post('/user').expect('Content-Type',/json/).expect(500).send({
            "Name": "Muchoki",
            "Password": "Essmuch@1" 
        }).then((response:request.Response)=>{
            expect(response.body).toEqual(expect.objectContaining({
                code:expect.stringContaining('ERR_HTTP_INVALID_STATUS_CODE')  
            }))

        })

    })

    2.// Get all users in the system success
    it('should get all users from the system',()=>{
        return request(app).get('/user').expect('Content-Type',/json/).expect(200)
        .then((response:request.Response)=>{
            expect(response.body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    "About_me": null,
                    "Email": expect.any(String),
                    "Is_delete": expect.any(Number),
                    "Name": expect.any(String),
                    "Password": expect.any(String),
                    "Picture": null,
                    "Title": null,
                    "User_id": expect.any(String),
                    "Username": null,
                    "email_sent":expect.any(Number)
                })
            ]))
            
            
        })
    })

3.//GET ONE USER WITH UPDATE PROFILE
    it('should get one users from the system with updated profile',()=>{
        return request(app).get('/user/a474a1fd-dc1f-46d8-ba42-e6ab067a8f3c').expect('Content-Type',/json/).expect(200).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    "About_me": expect.any(String),
                    "Email": expect.any(String),
                    "Is_delete": expect.any(Number),
                    "Name": expect.any(String),
                    "Password": expect.any(String),
                    "Picture": expect.any(String),
                    "Title": expect.any(String),
                    "User_id": expect.any(String),
                    "Username": expect.any(String),
                    "email_sent":expect.any(Number)
                })
            )   
        })
    })


    // Get one user in the system failure
    it('should not get a user from the system with wrong ID',()=>{
        return request(app).get('/user/53').expect('Content-Type',/json/).expect(404).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({message:"User not found"})
            )   
        })
    })

    // Unauthorized to update without token
    it('Should update user profile',()=>{
        return request(app).put('/user/a474a1fd-dc1f-46d8-ba42-e6ab067a8f3c').expect('Content-Type', /json/).expect(401).
        send({
            "About_me":'I am a UI designer',
            "Email": 'muchokiesther8@gmail.com',
            "Picture": 'we moove on',
            "Title": 'Best in UI',
            "Username": 'BIU',
        }).then((response:request.Response)=>{
            expect(response.body).toEqual(expect.objectContaining({
                message:expect.stringContaining("Unauthorized")
            }))
        })
    })


    // Updating user profile success
    it('Should update user profile',()=>{
        return request(app).put('/user/a474a1fd-dc1f-46d8-ba42-e6ab067a8f3c').expect('Content-Type', /json/).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiOWM2MmI2OGEtZTQyYi00NzhlLTg4YmEtNDliYjA1ZTM0YTYxIiwiTmFtZSI6Ik11Y2hva2kiLCJFbWFpbCI6Im11Y2hva2llc3RoZXI4QGdtYWlsLmNvbSIsIlBpY3R1cmUiOm51bGwsIlVzZXJuYW1lIjpudWxsLCJUaXRsZSI6bnVsbCwiQWJvdXRfbWUiOm51bGwsImVtYWlsX3NlbnQiOjAsImlhdCI6MTY4NzM0OTg1MywiZXhwIjoxNjg3NDIxODUzfQ.s9Oa_DrncuA445qCnuT33-Bb-97sCzfDZdeGE3uiavs').expect(200).
        send({
            "About_me":'I am a UI designer',
            "Email": 'muchokiesther8@gmail.com',
            "Picture": 'we moove on',
            "Title": 'Best in UI',
            "Username": 'BIU',
        }).then((response:request.Response)=>{
            expect(response.body).toEqual(expect.objectContaining({
                message:expect.stringContaining('User profile updated successfully')
            }))
        })
    })


    //Updating user profile failure
    it('Should update user profile',()=>{
        return request(app).put('/user/a474a').expect('Content-Type', /json/).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiOWM2MmI2OGEtZTQyYi00NzhlLTg4YmEtNDliYjA1ZTM0YTYxIiwiTmFtZSI6Ik11Y2hva2kiLCJFbWFpbCI6Im11Y2hva2llc3RoZXI4QGdtYWlsLmNvbSIsIlBpY3R1cmUiOm51bGwsIlVzZXJuYW1lIjpudWxsLCJUaXRsZSI6bnVsbCwiQWJvdXRfbWUiOm51bGwsImVtYWlsX3NlbnQiOjAsImlhdCI6MTY4NzM0OTg1MywiZXhwIjoxNjg3NDIxODUzfQ.s9Oa_DrncuA445qCnuT33-Bb-97sCzfDZdeGE3uiavs').expect(200).
        send({
            "About_me":'I am a UI designer',
            "Email": 'muchokiesther8@gmail.com',
            "Picture": 'we moove on',
            "Title": 'Best in UI',
            "Username": 'BIU',
        }).then((response:request.Response)=>{
            expect(response.body).toEqual(expect.objectContaining({
                message:expect.stringContaining('User profile updated successfully')
            }))
        })
    })


    ///POST QUESTION

    it.skip('Should add a question',()=>{
        return  request(app).post('/question/9c62b68a-e42b-478e-88ba-49bb05e34a61').expect('Content-Type', /json/).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiOWM2MmI2OGEtZTQyYi00NzhlLTg4YmEtNDliYjA1ZTM0YTYxIiwiTmFtZSI6Ik11Y2hva2kiLCJFbWFpbCI6Im11Y2hva2llc3RoZXI4QGdtYWlsLmNvbSIsIlBpY3R1cmUiOm51bGwsIlVzZXJuYW1lIjpudWxsLCJUaXRsZSI6bnVsbCwiQWJvdXRfbWUiOm51bGwsImVtYWlsX3NlbnQiOjAsImlhdCI6MTY4NzM1MTQwOSwiZXhwIjoxNjg3NDIzNDA5fQ.fnSlOPdlF-Zerf8Xfrzq6wPcfDRfsORRbRRNQ_CFtS8').expect('Content-Type', /json/)
        .expect(201).send({
             "Title": "Does Cypress work on ...",
             "Body": "a JavaScript-based end-to-end testing tool designed for modern web test automation",
             "Tags": [{
               "Tag_id": 1,
               "Tag_name": "JavaScript"
             }]

        }).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Your question has been submitted')
                }))
        })
    })


/// CANNOT ADD QUESTION WITHOUT TOKEN
    it('Should add a question',()=>{
        return  request(app).post('/question/2').expect('Content-Type', /json/)
        .expect(401).send({
             "Title": "Does Cypress work on ...",
             "Body": "a JavaScript-based end-to-end testing tool designed for modern web test automation",
             "Tags": [{
               "Tag_id": 1,
               "Tag_name": "JavaScript"
             }]

        }).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Unauthorized')
                }))
        })
    })


    /// GET ALL QUESTION
    it('Should get all questions in the system ',()=>{
        return request(app).get('/question').expect('Content-Type',/json/).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiOWM2MmI2OGEtZTQyYi00NzhlLTg4YmEtNDliYjA1ZTM0YTYxIiwiTmFtZSI6Ik11Y2hva2kiLCJFbWFpbCI6Im11Y2hva2llc3RoZXI4QGdtYWlsLmNvbSIsIlBpY3R1cmUiOm51bGwsIlVzZXJuYW1lIjpudWxsLCJUaXRsZSI6bnVsbCwiQWJvdXRfbWUiOm51bGwsImVtYWlsX3NlbnQiOjAsImlhdCI6MTY4NzM1MTQwOSwiZXhwIjoxNjg3NDIzNDA5fQ.fnSlOPdlF-Zerf8Xfrzq6wPcfDRfsORRbRRNQ_CFtS8').expect('Content-Type', /json/).expect(200).then((response:request.Response)=>{
            expect(response.body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    "QuestionId": expect.any(String),
                    "Title": expect.any(String),
                    "Body": expect.any(String),
                    "UserName":expect.any(String),
                    "TagName": expect.any(String)
                })
            ]))
            
            
        })
    })


    //GET QUESTION BY ID
    it('Should get all questions in the system a user has posted',()=>{
        return request(app).get('/question//9c62b68a-e42b-478e-88ba-49bb05e34a61').expect('Content-Type',/json/).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiOWM2MmI2OGEtZTQyYi00NzhlLTg4YmEtNDliYjA1ZTM0YTYxIiwiTmFtZSI6Ik11Y2hva2kiLCJFbWFpbCI6Im11Y2hva2llc3RoZXI4QGdtYWlsLmNvbSIsIlBpY3R1cmUiOm51bGwsIlVzZXJuYW1lIjpudWxsLCJUaXRsZSI6bnVsbCwiQWJvdXRfbWUiOm51bGwsImVtYWlsX3NlbnQiOjAsImlhdCI6MTY4NzM1MTQwOSwiZXhwIjoxNjg3NDIzNDA5fQ.fnSlOPdlF-Zerf8Xfrzq6wPcfDRfsORRbRRNQ_CFtS8').expect('Content-Type', /json/).expect(200).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    "QuestionId": expect.any(String),
                    "Title": expect.any(String),
                    "Body": expect.any(String),
                    "UserName":expect.any(String),
                    "TagName": expect.any(String)
                })
            )  
        })
    })

    // GET QUESTION BY ID WITH WRONG ID
    it('Should not get any questions in the system a user has posted',()=>{
        return request(app).get('/question//9c62b68a').expect('Content-Type',/json/).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiOWM2MmI2OGEtZTQyYi00NzhlLTg4YmEtNDliYjA1ZTM0YTYxIiwiTmFtZSI6Ik11Y2hva2kiLCJFbWFpbCI6Im11Y2hva2llc3RoZXI4QGdtYWlsLmNvbSIsIlBpY3R1cmUiOm51bGwsIlVzZXJuYW1lIjpudWxsLCJUaXRsZSI6bnVsbCwiQWJvdXRfbWUiOm51bGwsImVtYWlsX3NlbnQiOjAsImlhdCI6MTY4NzM1MTQwOSwiZXhwIjoxNjg3NDIzNDA5fQ.fnSlOPdlF-Zerf8Xfrzq6wPcfDRfsORRbRRNQ_CFtS8').expect('Content-Type', /json/).expect(404).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({message:'Questions not found'})
            )  
        })
    })



    // UPDATE QUESTION
    it('Should update a question',()=>{
        return  request(app).put('/question/9c62b68a-e42b-478e-88ba-49bb05e34a61/90f5f50d-813b-4349-a3fa-8048306e79b8').expect('Content-Type', /json/).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiOWM2MmI2OGEtZTQyYi00NzhlLTg4YmEtNDliYjA1ZTM0YTYxIiwiTmFtZSI6Ik11Y2hva2kiLCJFbWFpbCI6Im11Y2hva2llc3RoZXI4QGdtYWlsLmNvbSIsIlBpY3R1cmUiOm51bGwsIlVzZXJuYW1lIjpudWxsLCJUaXRsZSI6bnVsbCwiQWJvdXRfbWUiOm51bGwsImVtYWlsX3NlbnQiOjAsImlhdCI6MTY4NzM1MTQwOSwiZXhwIjoxNjg3NDIzNDA5fQ.fnSlOPdlF-Zerf8Xfrzq6wPcfDRfsORRbRRNQ_CFtS8').expect('Content-Type', /json/)
        .expect(200).send({
             "Title": "Does Cypress work on ...",
             "Body": "a JavaScript-based end-to-end testing tool designed for modern web test automation and it is actualy very useful",
             "Tags": [{
               "Tag_id": 1,
               "Tag_name": "JavaScript"
             }]

        }).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Question updated')
                }))
        })
    })


    // CANNOT UPDATE QUESTIONS

    it('Should update a question',()=>{
        return  request(app).put('/question/9c62b68a-e42b-478e-88ba-49bb05e34a61/90f5f50d-813b-4349-a3fa-8048306e79b8').expect('Content-Type', /json/).expect('Content-Type', /json/)
        .expect(401).send({
             "Title": "Does Cypress work on ...",
             "Body": "a JavaScript-based end-to-end testing tool designed for modern web test automation and it is actualy very useful",
             "Tags": [{
               "Tag_id": 1,
               "Tag_name": "JavaScript"
             }]

        }).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Unauthorized')
                }))
        })
    })


    // DELETE QUESTION SUCCESS
    it('Should delete a question',()=>{
        return request(app).delete('/question/9c62b68a-e42b-478e-88ba-49bb05e34a61/90f5f50d-813b-4349-a3fa-8048306e79b8').expect('Content-Type',/json/).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiOWM2MmI2OGEtZTQyYi00NzhlLTg4YmEtNDliYjA1ZTM0YTYxIiwiTmFtZSI6Ik11Y2hva2kiLCJFbWFpbCI6Im11Y2hva2llc3RoZXI4QGdtYWlsLmNvbSIsIlBpY3R1cmUiOm51bGwsIlVzZXJuYW1lIjpudWxsLCJUaXRsZSI6bnVsbCwiQWJvdXRfbWUiOm51bGwsImVtYWlsX3NlbnQiOjAsImlhdCI6MTY4NzM1MTQwOSwiZXhwIjoxNjg3NDIzNDA5fQ.fnSlOPdlF-Zerf8Xfrzq6wPcfDRfsORRbRRNQ_CFtS8').expect('Content-Type', /json/).expect(200).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({message:'question deleted'})
            )  
        })
    })


    //DELETE QUESTION FAILURE


    // ADD ANSWER SUCCESS
    it('Should add a answer',()=>{
        return  request(app).post('/answer/9c62b68a-e42b-478e-88ba-49bb05e34a61/67813ff7-290f-4e54-9d79-99e9184a1524').expect('Content-Type', /json/).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiOWM2MmI2OGEtZTQyYi00NzhlLTg4YmEtNDliYjA1ZTM0YTYxIiwiTmFtZSI6Ik11Y2hva2kiLCJFbWFpbCI6Im11Y2hva2llc3RoZXI4QGdtYWlsLmNvbSIsIlBpY3R1cmUiOm51bGwsIlVzZXJuYW1lIjpudWxsLCJUaXRsZSI6bnVsbCwiQWJvdXRfbWUiOm51bGwsImVtYWlsX3NlbnQiOjAsImlhdCI6MTY4NzM1MTQwOSwiZXhwIjoxNjg3NDIzNDA5fQ.fnSlOPdlF-Zerf8Xfrzq6wPcfDRfsORRbRRNQ_CFtS8').expect('Content-Type', /json/)
        .expect(201).send({
             "Title":"It is because...",
             "Body": "This developer-friendly tool operates directly in the browser using a DOM manipulation technique and enables front-end developers and QA engineers to write automated web tests while eliminating pain points."
        }).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Your answer has been submitted')
                }))
        })
    })

    
    // ADD ANSWER SUCCESS FAILURE WITHOUT TOKEN
    it('Should not add a answer',()=>{
        return  request(app).post('/answer/9c62b68a-e42b-478e-88ba-49bb05e34a61/67813ff7-290f-4e54-9d79-99e9184a1524').expect('Content-Type', /json/).expect('Content-Type', /json/)
        .expect(401).send({
             "Title":"It is because...",
             "Body": "This developer-friendly tool operates directly in the browser using a DOM manipulation technique and enables front-end developers and QA engineers to write automated web tests while eliminating pain points."
        }).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Unauthorized')
                }))
        })
    })


    //GET ANSWER BY QUESTION ID SUCCESS

    it('Should get answer by question ID',()=>{
        return  request(app).get('/answer/67813ff7-290f-4e54-9d79-99e9184a1524')
        .expect('Content-Type', /json/).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiOWM2MmI2OGEtZTQyYi00NzhlLTg4YmEtNDliYjA1ZTM0YTYxIiwiTmFtZSI6Ik11Y2hva2kiLCJFbWFpbCI6Im11Y2hva2llc3RoZXI4QGdtYWlsLmNvbSIsIlBpY3R1cmUiOm51bGwsIlVzZXJuYW1lIjpudWxsLCJUaXRsZSI6bnVsbCwiQWJvdXRfbWUiOm51bGwsImVtYWlsX3NlbnQiOjAsImlhdCI6MTY4NzM1MTQwOSwiZXhwIjoxNjg3NDIzNDA5fQ.fnSlOPdlF-Zerf8Xfrzq6wPcfDRfsORRbRRNQ_CFtS8').expect('Content-Type', /json/)
        .expect(200).then((response:request.Response)=>{
            expect(response.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                    "Title": expect.any(String),
                     "Body": expect.any(String)
                })
            ])    
            )
        })
    })


     //GET ANSWER BY QUESTION ID FAILURE

     it('Should not get answer by question ID',()=>{
        return  request(app).get('/answer/67813ff7-290f-4e54-9d79-99e9184a1524')
        .expect('Content-Type', /json/)
        .expect(401).then((response:request.Response)=>{
            expect(response.body).toEqual(expect.objectContaining({message:'Unauthorized'})    
            )
        })
    })


    // ACCEPT MOST SUITABLE ANSWER

it('Should mark answer as preferred',()=>{
        return  request(app).put('/answer/0c5fb87a-5e9f-46c0-ae7c-5fd8bc0498c1').expect('Content-Type', /json/).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiOWM2MmI2OGEtZTQyYi00NzhlLTg4YmEtNDliYjA1ZTM0YTYxIiwiTmFtZSI6Ik11Y2hva2kiLCJFbWFpbCI6Im11Y2hva2llc3RoZXI4QGdtYWlsLmNvbSIsIlBpY3R1cmUiOm51bGwsIlVzZXJuYW1lIjpudWxsLCJUaXRsZSI6bnVsbCwiQWJvdXRfbWUiOm51bGwsImVtYWlsX3NlbnQiOjAsImlhdCI6MTY4NzM1MTQwOSwiZXhwIjoxNjg3NDIzNDA5fQ.fnSlOPdlF-Zerf8Xfrzq6wPcfDRfsORRbRRNQ_CFtS8')
        .expect(200).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Answer marked as most preferred')
                }))
        })
    })


    //CANNOT MARK MOST APPROPRIATE ANSWER
    it('Should mark answer as preferred',()=>{
        return  request(app).put('/answer/0c5fb87a-5e9f-46c0-ae7c-5fd8bc0498c1').expect('Content-Type', /json/)
        .expect(401).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Unauthorized')
                }))
        })
    })


    // ADD COMMENT SUCCESS
    it('Should add comment',()=>{
        return  request(app).post('/comment/c5e17290-88a6-43bb-a292-624f6b3083b5').expect('Content-Type', /json/).expect('Content-Type', /json/).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiOWM2MmI2OGEtZTQyYi00NzhlLTg4YmEtNDliYjA1ZTM0YTYxIiwiTmFtZSI6Ik11Y2hva2kiLCJFbWFpbCI6Im11Y2hva2llc3RoZXI4QGdtYWlsLmNvbSIsIlBpY3R1cmUiOm51bGwsIlVzZXJuYW1lIjpudWxsLCJUaXRsZSI6bnVsbCwiQWJvdXRfbWUiOm51bGwsImVtYWlsX3NlbnQiOjAsImlhdCI6MTY4NzM1MTQwOSwiZXhwIjoxNjg3NDIzNDA5fQ.fnSlOPdlF-Zerf8Xfrzq6wPcfDRfsORRbRRNQ_CFtS8')
        .expect(200).send({
             "Body": "This developer-friendly tool operates directly in the browser using a DOM manipulation technique and enables front-end developers and QA engineers to write automated web tests while eliminating pain points."
        }).then((response:request.Response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('You Commented on this answer')
                }))
        })
    })



    //GET COMMENT SUCCESS
    it('Should get all comments in an answer',()=>{
        return  request(app).get('/comment/c5e17290-88a6-43bb-a292-624f6b3083b5')
        .expect('Content-Type', /json/).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX2lkIjoiOWM2MmI2OGEtZTQyYi00NzhlLTg4YmEtNDliYjA1ZTM0YTYxIiwiTmFtZSI6Ik11Y2hva2kiLCJFbWFpbCI6Im11Y2hva2llc3RoZXI4QGdtYWlsLmNvbSIsIlBpY3R1cmUiOm51bGwsIlVzZXJuYW1lIjpudWxsLCJUaXRsZSI6bnVsbCwiQWJvdXRfbWUiOm51bGwsImVtYWlsX3NlbnQiOjAsImlhdCI6MTY4NzM1MTQwOSwiZXhwIjoxNjg3NDIzNDA5fQ.fnSlOPdlF-Zerf8Xfrzq6wPcfDRfsORRbRRNQ_CFtS8').expect('Content-Type', /json/)
        .expect(200).then((response:request.Response)=>{
            expect(response.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                     "Body": expect.any(String)
                })
            ])    
            )
        })
    })


        })