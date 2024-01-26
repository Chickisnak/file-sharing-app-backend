![alt text](https://chickisnak.github.io/file-sahring-app/logo.png)

# InShare - File Sharing Application

InShare is a file-sharing web application designed to simplify the process of sharing images. It leverages cloud storage and email communication to provide a seamless experience for users.

🪶 **Features**
1. *Easy File Uploads* : Quickly upload images through a simple drag-and-drop or file selection interface.
2. *Cloud Storage* : Files are securely stored in the cloud using Cloudinary, ensuring reliable and efficient storage.
3. *Link Expiry* : Uploaded files automatically expire after 24 hours, providing a time-sensitive sharing mechanism.
4. *Email Sharing* : Share files with others via email directly from the application.

🧰**Technologies Used**
1. *Express* : Backend server framework for handling API requests and serving static files.
2. *Cloudinary* : Cloud-based storage for managing and storing uploaded images.
3. *Multer* : Middleware for handling file uploads.
4. *EJS* : Templating engine for rendering dynamic HTML content.
5. *Axios* : HTTP client for making API requests.

***Setup Instructions***

1. **Clone the repository** : `git clone https://github.com/Chickisnak/file-sharing-app-backend`
2. **Install dependencies** : `npm install`
3. **Set up environment variables** :
      - Create a `.env` file based on the provided `.env.example`.
      - Add your Cloudinary credentials and other necessary details.
4. **Run the application** : `npm start`
5. Access the application in your browser at `http://localhost:3000`.

**Usage**

1. Upload an image using the provided interface.
2. Obtain a shareable link for the uploaded image.
3. Optionally, send the file via email to a specified recipient.

**File Structure**

 - `/config` : Configuration files (e.g., database connection).
 - `/models` : Database models (e.g., File model).
 - `/routes` : Express route handlers.
 - `/services` : Email service and templates.
 - `/public` : Static assets (CSS, images).
 - `/views` : EJS templates.

## Frontend Code Repository

The frontend code for this project is hosted in a separate repository. You can find it at the following link:

[📦Frontend Repository](https://github.com/Chickisnak/file-sahring-app)
