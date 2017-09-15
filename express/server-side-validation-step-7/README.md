# User Sign Up: Server-side Validation

Testing post request on req.body with body-parser:



 ## file: /server/routes/users.js

 ```
router.post('/', (req, res) => {

  console.log(req.body);
  // const { errors, isValid } = validateInput(req.body);

  // if (!isValid) {
  //   res.status(400).json(errors);
  // }
});

 ```

Termial output

```
webpack built 11650bdc9c5f6ae46af6 in 2295ms
{ username: 'Alex',
  email: 'ddfd',
  password: 'gffgh',
  passwordConfirmation: 'hghg',
  timezone: 'Pacific/Pago_Pago',
  errors: 
   { email: 'Email is invalid',
     passwordConfirmation: 'Passwords must match' },
  isLoading: false }

 ```
