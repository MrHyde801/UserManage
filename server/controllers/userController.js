const express = require('express')
const app = express()
const fs = require('fs')
const uuid = require('uuid')
const jsonFilePath = './server/lib/userList.json'
//connection to pool


let data
//View Users
exports.view = (req,res) => {
    fs.readFile('./server/lib/userList.json', 'utf-8', (err, jsonString)=> {
        if(err) {
            console.log(err)
        } else {
            try {
                data = JSON.parse(jsonString);
                // console.log(data.users)
                res.render('home', {rows: data.users})
            } catch (err) {
                console.log('Error parsing JSON', err)
            }
        }
    })

}

exports.form = (req,res)=> {
    res.render('add-user')
}

exports.create = (req,res) => {
    console.log(req.params.number)
    let user = {
                uniqeId: uuid.v4(),
                number: 0,
                userid: req.body.userid,
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }

    // console.log(user)

    fs.readFile(jsonFilePath, 'utf-8', (err, jsonString)=> {
        if(err) {
            console.log(err)
        } else {
            try {
                data = JSON.parse(jsonString);
                user.number = data.users.length + 1
                data.users.push(user)
                console.log(data.users)
                let newJson = JSON.stringify(data)
                fs.writeFile(jsonFilePath, newJson, (err)=> {
                    console.log('done')
                })
                res.render('add-user')
            } catch (err) {
                console.log('Error parsing JSON', err)
            }
        }
    })
}


//edit user
exports.edit = (req,res) => {
    //grab data from the array then make the change to the readfile
    let editIt = req.params.number
    fs.readFile('./server/lib/userList.json', 'utf-8', (err, jsonString)=> {
        if(err) {
            console.log(err)
        } else {
            try {
                data = JSON.parse(jsonString);

                console.log(data.users)
                let newJson = JSON.stringify(data)
                fs.writeFile(jsonFilePath, newJson, (err)=> {
                    console.log('done')
                })
                res.render('add-user')
            } catch (err) {
                console.log('Error parsing JSON', err)
            }
        }
    })

}


