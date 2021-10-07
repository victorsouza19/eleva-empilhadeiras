const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const db = require('../app');

// Customer verify function | Função de verificação de cliente
  exports.verify = (req, res) => {
      console.log(req.body);

      // Short form | forma curta:
      const { identify } = req.body;

      db.query('SELECT * FROM customers WHERE identify = ?', [identify], (error, results) => {
          if(error) {
              console.log(error);
          }

          if(results.length > 0) {
              res.render('customers/verify', {
                  successmessage: 'Cliente já cadastrado, deseja utilizar o cadastro existente?',
                  customer: results[0] 
              });
          
          } else if(!results.length) {
              res.render('customers/verify', {
                  alertmessage: 'Cliente não cadastrado'
              });
          
          }

          
      });

  };

  // customer register Function | Função de cadastro de cliente
  exports.new = (req, res) => {
      console.log(req.body);

      // Short form | forma curta:
      const { customerName, identify, telephone, adress, adressNumber, cep, adressComplement} = req.body;

      db.query('SELECT * FROM customers WHERE identify = ?', [identify], (error, results) => {
          if(error) {
              console.log(error);
          }

          if(results.length > 0) {
              return res.render('customerRegister', {
                  alertmessage: 'Cliente já cadastrado'
              });
          } 

          db.query('INSERT INTO addresses SET ?', { street: adress, number: adressNumber, cep: cep, complement: adressComplement}, async (error, results) => {
              if(error) {
                  console.log(error);
              } else {
                  console.log(results);
                  
              }

              let addresses_id = await results.insertId;


              db.query('INSERT INTO customers SET ?', { name: customerName, telephone: telephone, identify: identify, adress_id: addresses_id }, (error, results) => {
                  if(error) {
                      console.log(error);
                  } else {
                      console.log(results);
                      return res.render('successMessage', {
                          successmessage: 'Cliente criado'
                      });
                  }
              });
          });
          
      });

  };