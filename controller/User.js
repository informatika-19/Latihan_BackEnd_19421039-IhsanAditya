const usermodel = require('../model/user')
const bcrypt = require('bcrypt')
const user = require('../model/user')
exports.register = (data) =>
new Promise((resolve, reject) => {
 console.log(data)
// untuk mencari satu data
usermodel.findOne({
    username: data.username
}).then(adauser => {
    if (adauser) {
        resolve({
            status: false,
            pesan: 'username telah ada'
        })
    }else {
       bcrypt.hash(data.password, 10, (err, hash) => {
           data.password = hash
           // untuk menginput data/ create
           usermodel.create(data)
                .then(() => {
                    // console.log('berhasil')
                    resolve({
                        status: true,
                        pesan: 'berhasil insert data'
                    })
                }).catch((e) => {
                    //console.log(e)
                    // console.log('gagal inser')
                    reject({
                        status: false,
                        pesan: 'gagal insert data'
                    })
                })
       })
    }
})
})

exports.login = ( data) =>
new Promise((resolve, reject) =>{
    usermodel.findOne({
        username: data.username
    }).then(user => {
        if (user) {
            if (bcrypt.compareSync(data.password, user.password)){
                resolve({
                    status: true,
                    pesan: 'berhasil login'
                })
            }else {
                reject ({
                    status: false,
                    pesan: 'tidak berhasil login'
                })
            }
        }else {
            reject ({
                status: false,
                pesan: 'username tidak terdaftar'
            })
        }
    })

})