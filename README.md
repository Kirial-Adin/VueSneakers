How to launch a project?🤔
-----------------------
If you do not have the .env file in the server folder, then it must be added to this folder with the following values:
```.env
PORT=5000
DB_URL=mongodb+srv://root:root@authcluster.pabrq.mongodb.net/?retryWrites=true&w=majority&appName=authCluster
JWT_ACCESS_SECRET=json-secret-key-link
JWT_REFRESH_SECRET=json-refresh-secret-key-link\
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER=kirialadin191@gmail.com
SMTP_PASSWORD=zymr shbk abrx xkji
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:"Your port"
```

In the terminal:
cd client -> npm run dev

Then, in the new terminal:
cd server -> npm run dev

How do I register?🧐
-------------------------
Profile -> enter user data -> click on the "Register" button.
Then you will receive an email with a link to confirm your account at the specified email address. You need to click on the link, after which the account will be activated.

Now you can make purchases😊
--------------------------
