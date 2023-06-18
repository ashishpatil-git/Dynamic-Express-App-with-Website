<!-- Command to Install eslint -->

npm install -D eslint

<!-- To create a eslintrc.json file -->

npx eslint --init

<!-- Command to install and config prettier -->

npm install -D prettier eslint-config-prettier eslint-plugin-prettier

<!-- To setup a template engine in Node Application -->

1. install ejs --> npm install ejs
2. set template engine --> app.set("view engine","ejs")
3. set path to view folder --> app.set('views',path.join(\_\_dirname,'./views'))
4. Now you use respone.render method to render your webpages.
5. In order to render template page, use files with extension as ".ejs"
6. Dynamic data to template ejs page can be passed as options object in res.render method
   --eg : res.render('pages/index', { pageTitle: "MyPage" });

<!-- Way to handle session management -->

1. To handle a session-management in express application, we can use a module called "cookie-session".
2. Install module --> npm install cookie-session
3. Import module --> const cookieSession = require('cookie-session')
4. To inform express to trust this proxy --> app.set('trust proxy', 1) // trust first proxy
5. Now we can set key-credentials of session as -->
   app.use(cookieSession({
   name: 'session',
   keys: ['key1', 'key2']
   }))
   eg :-
   app.use(function (req, res, next) {
   req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge
   next()
   })
