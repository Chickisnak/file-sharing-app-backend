const router = require('express').Router()
const File = require('../models/file')

router.get('/:public_id', async (req,res)=>{
  try {
    const file = await File.findOne({
      public_id: req.params.public_id
    })
    if(!file){
      return res.render('download', { error:'Link has been destroyed.'})
    }
    return res.render('download', {
      public_id: file.public_id,
      fileName: file.filename,
      fileSize: file.size,
      downloadLink: `${process.env.APP_BASE_URL}shareBackendFiles/${file.public_id}`
    })
  } catch (error) {
    return res.render('download', { error:'Something went wrong.'})
  }
})

module.exports = router