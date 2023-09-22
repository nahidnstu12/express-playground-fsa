## Second Assignment
This is the second assignment of fullstack army bootcamp. Here i will try to build rest api, using express.
Here is the detailed research & documentation notion links
[doccs](https://nahid-me.notion.site/Assignment-2-5d1077aba9ec40c0b7090956fd033308)


### Tools
- Express
- MySQL
- Typeorm
- Joi
- Jest & supertest


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