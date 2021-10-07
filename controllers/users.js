const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const db = require('../app');

 // User register Function | Função de cadastro de usuário
 exports.new = (req, res) => {
  console.log(req.body);

  // EXTENDED FORM | FORMA ESTENDIDA: 
  // const name = req.body.name;
  // const email = req.body.email;
  // const role = req.body.role;
  // const password = req.body.password;
  // const passwordConfirm = req.body.passwordConfirm;

  // Short form | forma curta:
  const { name, email, role, password, passwordConfirm } = req.body;

  db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if(error) {
          console.log(error);
      }

      if(results.length > 0) {
          return res.render('users/register', {
              alertmessage: 'Este e-mail já está em uso'
          })
      } else if( password !== passwordConfirm ) {
          return res.render('users/register', {
              alertmessage: 'As senhas não coincidem'
          });
      }

      // Encriptando a senha
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query('INSERT INTO users SET ?', { name: name, email: email, role: role, password: hashedPassword }, (error, results) => {
          if(error) {
              console.log(error);
          } else {
              console.log(results);
              return res.render('successMessage', {
                  successmessage: 'Usuário criado'
              });
          }
      })
      
  });

};
