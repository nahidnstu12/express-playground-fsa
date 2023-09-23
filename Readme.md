## Second Assignment
This is the second assignment of fullstack army bootcamp. Here i will try to build rest api, using express.
Here is the detailed research & documentation notion links
[docs](https://nahid-me.notion.site/Assignment-2-5d1077aba9ec40c0b7090956fd033308)


### Tools
- Express
- MySQL
- Typeorm
- Joi
- Jest & supertest

### How to run this project
```
first please ensure to checkout assignment_2 branch
git clone https://github.com/nahidnstu12/express-playground-fsa

for install dependencies, run 
yarn 

copy env.local.example to env.local and set your environment varianbles
copy env.test.example to env.test and set your environment varianbles

create your database for dev & test

then you ready to run your project dev mode, run
yarn dev

and when you want to run tests, run
yarn test

if you want to single file test, run 
yarn run test auth.test.js  --watchAll=false

```

### Refactoring Scopes
For limitations of time, i will listing points what i refactor later.
- route (some route optimized or removed) (fixed)
  -  User approved / blocked
  - Menu published / unpublished
- Model (enum value convert to number)
- Require optional authentication middleware (fixed)
- Implement pagination
- Implement Logging for error tracing
- Implement Seeding



### Facing Issues
- Global Error Handler
- Params validation
- Query Params validation

### Scripts
```
single test file run
yarn run test auth.test.js  --watchAll=false
```

### Contributors

[//]: # (- Mazharul Islam [Contact by mail]&#40;mailto:nahid.dev19@gmail.com&#41;)
Mazharul Islam [nahid.dev19@gmail.com](mailto:nahid.dev19@gmail.com)