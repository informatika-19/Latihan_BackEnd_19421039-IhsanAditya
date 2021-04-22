const kegiatanModel = require('../model/kegiatan')
const objectId = require('mongoose').Types.ObjectId

exports.create= (data) =>
  new Promise((resolve, reject)=> {
    //kegiatanModel.create() fungsi untuk menyimpan kegiatan yang di imput
    kegiatanModel.create(data)
      .then(()=> resolve({
        status : true,
        pesan : 'berhasil iput'
      })).catch(()=> ({
        status : false,
        pesan : 'gagal iput'
      }))
  })

  exports.showAllData = () =>
    new Promise((resolve, reject) => {
      kegiatanModel.find()
        .then(result => {
          resolve({
            status: true,
            pesan: 'Berhasil Menampilkan Data',
            data: result
          })
        }).catch(() => reject({
            status: false,
            pesan: 'Gagal Menapilkan Data',
            data: []
        }))
    })

exports.showDataById = (id) =>
    new Promise((resolve, reject) => {
      kegiatanModel.findOne({
        _id: objectId(id)
    }).then(result => {
      resolve({
        status: true,
        pesan: 'Berhasil Menampilkan Data',
        data: result
      })
    }).catch(() => reject({
      status: false,
      pesan: 'Gagal Menapilkan Data',
      data: null
  }))
})

exports.update = (id, data) => 
  new Promise ((resolve, reject) => {
    kegiatanModel.updateOne({
      _id: objectId(id)
    }, data).then(() => resolve({
        status: true,
        pesan: 'Berhasil Mengubah Data'
    })).catch(() => reject({
        status: false,
        pesan: 'Gagal Mengubah Data'
    }))
})

exports.delete = (id) =>
  new Promise((resolve, reject) => {
    kegiatanModel.deleteOne({
      _id: objectId(id)
    }).then(() => resolve ({
      status: true,
      pesan : 'Berhasil Menghapus Data'
    })).catch(() => reject({
      status: false,
      pesan: 'Gagal Menghapus Data'
  }))
})
