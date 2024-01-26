const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const sendMail = require('../services/emailService');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.memoryStorage(); // Use memory storage to handle file as buffer

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000 * 100,
  },
}).single('myfile');

router.post('/', (req, res) => {
  // Store files
  upload(req, res, async (err) => {
    // validate request
    if (!req.file) {
      return res.json({
        error: 'All fields are required.',
      });
    }
    if (err) {
      return res.status(500).send({
        error: err.message,
      });
    }

    // Upload to Cloudinary
    try {
      cloudinary.uploader.upload_stream({
        resource_type: 'image', folder: 'shareBackendFiles',
        expires_at: Math.round((Date.now() + 5 * 1000) / 1000)
      },
        async (error, result) => {
          if (error) {
            return res.status(500).send({
              error: error.message,
            });
          }

          const downloadLink = await cloudinary.url(result.public_id, {
            flags: "attachment",
          })

          // Store into Database
          const file = new File({
            public_id: result.public_id.split('/')[1],
            filename: req.file.originalname,
            url: downloadLink,
            size: result.bytes,
          });
          const response = await file.save();

          return res.json({
            file: `${response.url}`,
          });
        }).end(req.file.buffer);
    } catch (error) {
      return res.status(501).json({
        message: 'Something wrong in connecting server.',
        error: error
      })
    }
  });
});

router.post('/send', async (req, res) => {
  // Rest of your code for sending emails
  const { public_id, emailTo, emailFrom } = req.body;
  //validate
  if (!public_id || !emailTo || !emailFrom) {
    return res.status(422).send({
      error: 'All fields are required.'
    })
  }

  // Get data from database

  const file = await File.findOne({ public_id: public_id });
  if (!file) {
    return res.status(422).send({
      error: `File don't exist`,
    })
  }
  if (file.sender) {
    return res.status(422).send({
      error: 'Email already sent.'
    })
  }

  file.sender = emailFrom;
  file.receiver = emailTo;
  await file.save();

  // Send email
  sendMail({
    from: emailFrom,
    to: emailTo,
    subject: 'Inshare file sharing',
    text: `${emailFrom} shared a file with you.`,
    html: require('../services/emailTemplate')({
      emailFrom: emailFrom,
      downloadLink: `https://file-sharing-app-backend-w39i.onrender.com/files/shareBackendFiles/${public_id}`,
      size: parseInt(file.size / 1000) + ' KB',
      expires: '24 hours'
    })
  });

  return res.send({ success: true })
});

module.exports = router;
