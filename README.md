# General Api

<img src="https://github.com/livecloset/microserver-image-upload/blob/main/card-upload-image.png" align="right"
     alt="Size Limit logo by Anton Lovchikov" width="150" height="178">

General Api is a server that belongs to Live Closet project with the objective to join all the micro-servers and connect them with the database providing all required data. Also the server does the main activies of Live Closet project.

## What It Does

1. User
   - Create an Account.
   - Login in some Account.
   - Recover passwords.
   - Get data of some Account.
   - Update the plan of Account.
   - Update some data of Account.
   - Delete some User.
  
2. Garment 
   - Create a Garment.
   - Update some data of Garment.
   - Get data of some Garment.
   - Get all Garments from a Closet.
   - Link a Garment with some Place.
   - Delete some Garment.
  
3. Place 
   - Create a new Place.
   - Get some Place.
   - Get all Places from a Closet.
   - Delete some Place.

## Usage

1. Install the server:

    ```sh
    $ npm install 
    ```

2. Run the server:

    ```diff
    $ npm start
    ```

3. Run tests:

    ```diff
    $ npm test
    ```


## Libraries

* `aws-sdk` the amazon library to get access to the S3 Bucket.
* `dotenv` stores configuration in the environment separate from code in .env file.
* `express` create a robust API quickly and easy.
* `express-fileupload` express middleware for uploading files.
* `jest` the framework used for handle tests.
* `supertest` provides a high-level abstraction for testing the requests.

