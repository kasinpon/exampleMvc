import "reflect-metadata";
import * as express from 'express'
let server = express()
let bodyParser = require("body-parser")
// import routeV1 from './api/v1/route'
// import app from "./api/v1/route/practiceVideo";
import {createConnection,getConnection} from "typeorm";
import {Member} from "./entity/Member";
createConnection().then(async connection => {
    const cors = require('cors');

    const PORT =  7000;
    /* Fixed none Authorization CORS*/
    server.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,accesstoken");
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    server.use(cors());
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({extended: false}))

    /* Fixed none Authorization CORS*/

    server.get('/',(req, res)=>{
        res.send("Access denieddddddddddd!")
    })

    server.post('/register',async (req, res)=>{
        // let data = JSON.parse(req.body)
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let username = req.body.username
        let password = req.body.password
        let datamember = new Member()
        datamember.firstname = firstname,
        datamember.lastname = lastname,
        datamember.username = username,
        datamember.password = password
        await getConnection().getRepository(Member).save(datamember)
        res.send("create success")
    })

    server.post('/login',async (req, res)=>{
        let user = req.body.username
        let pass = req.body.password
        let data = await getConnection().getRepository(Member).findOne({ username : user, password : pass }, )
        if (data == undefined){
            res.send("login fail")
        }else {
            res.send("login pass")
        }
    })
    // server.use('/api/v1',routeV1)

    server.listen(PORT, () => {
        console.log('Server running:' + PORT);
    })
})