const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const db = require('../app');


// Order Interactions || interações com as ordens de serviço pela rota "/orders"
    exports.orders = async (req,res) => {
        try {

        db.query('SELECT o.id, c.name, c.identify, o.responsible, o.status, o.type FROM orders AS o INNER JOIN customers as c ON c.id = o.customer_id ORDER BY o.initial_date DESC;', async (error, rows) => {
            if(error){
                console.log(error)

            } else if(rows.length > 0) {
                return res.render('orders/orders', {
                    items: rows 
                });


            } else {
                return res.render('orders/orders', {
                    alertmessage: "Nenhuma ordem de serviço cadastrada"
                })
            }
        });


        } catch (error) {
            console.log(error);
        }
    };
    
    exports.edit = async (req,res) => {
        try {
            console.log(req.params.id);
            id = req.params.id

        db.query('SELECT * FROM orders WHERE id = ?', [id], async (error, result) => {
            if(error){
                console.log(error);
            }  
            
            if(result.length > 0) {
                console.log(result);
                let customer_id = await result[0].customer_id;
                let order = result[0];

                let orderType;
                let open, progress, closed;
    

                if(order.type == "Requisição"){
                    orderType = true;
                } else if (order.type == "Incidente"){
                    orderType = false;
                };

                if(order.status =="Aberto"){
                    open = true;
                }
                else if(order.status =="Em andamento"){
                    progress = true;
                }
                else if(order.status =="Fechado"){
                    closed = true;
                }
            
                db.query('SELECT * FROM customers WHERE id = ?', [customer_id], async (error, result)=> {
                    if(error){
                        console.log(error);
                    }
                    
                    if(result.length > 0){
                        res.render('orders/edit',{
                            order,
                            orderType,
                            open, progress, closed,
                            customer: result[0]
                        });
                    }

                });
            }
        });         

        } catch (error) {
            console.log(error);
        }
    };

    exports.delete = async (req,res) => {
        try {
            console.log(req.params.id);
            id = req.params.id

            db.query('DELETE FROM orders WHERE id = ?', [id], async (error, result) => {
                if(error){
                    return console.log(error);
                }  
                
                else if(result) {
                    console.log(result);
                    db.query('SELECT o.id, c.name, c.identify, o.responsible, o.status, o.type FROM orders AS o INNER JOIN customers as c ON c.id = o.customer_id ORDER BY o.initial_date DESC;', async (error, rows) => {
                        if(error){
                            console.log(error)
            
                        } else if(rows.length > 0) {
                            return res.render('orders/orders', {
                                items: rows, 
                                successmessage: "Ordem de serviço apagada!"
                            });
            
            
                        } else {
                            return res.render('orders/orders', {
                                alertmessage: "Nenhuma ordem de serviço cadastrada"
                            })
                        }
                    });
                }
            });      

        } catch (error) {
            console.log(error);
        }
    };


// Os Function | Função de Os
  exports.register = (req, res) => {
  console.log(req.body);

  const { identify } = req.body;
  db.query('SELECT id, provider, manufacturer, model FROM equipments', (error, rows) => {
      if(error) {
      console.log(error);
      res.redirect.status(404);
      }
      if (rows.length > 0){
          db.query('SELECT * from customers WHERE identify = ?', [identify], (error, results) => {
              if (error) {
                  console.log(error);
              }
              if (results.length > 0) {
                  console.log(rows);
                  return res.render('orders/register', {
                      customer: results[0],
                      equipment: rows
                  });
              }
  
          });

      } else {
          db.query('SELECT * from customers WHERE identify = ?', [identify], (error, results) => {
              if (error) {
                  console.log(error);
              }
              if (results.length > 0) {
                  console.log(rows);
                  return res.render('orders/register', {
                      customer: results[0],
                      emptymessage: "Nenhum equipamento cadastrado!"
                  });
              }
          });
      }
  });   
  }

  exports.customRegister = (req, res) => {
  console.log(req.body);

  db.query('SELECT id, provider, manufacturer, model FROM equipments', (error, rows) => {
      if(error) {
      console.log(error);
      res.redirect.status(404);
      }

      if (rows.length > 0){
          console.log(rows);
          return res.render('orders/customRegister', {
              equipment: rows
          });
      } else {
          return res.render('orders/customRegister', {
              emptymessage: "Nenhum equipamento cadastrado!"
          });
      }
  }); 
  }

// Os Function | Função de Os
  exports.new = (req, res) => {
  console.log(req.body);

  const {customer_id, responsible, os_type, description, status, equipment_situation} = req.body;
  let initial_date = new Date();

  // check the type of equipment input | checar o tipo de inserção de equipamento
  // if new equipment
  if (equipment_situation == "new"){
      const { provider_type, made, model, price, equipment_description } = req.body;

      db.query('INSERT INTO equipments SET ?', { provider: provider_type, manufacturer: made, model: model, price: price, description: equipment_description}, async (error, results) => {

          if(error) {
              console.log(error);
              return res.render('successMessage', {
                  errormessage: 'Erro ao cadastrar equipamento!'
              });
          } else {
              let id_equip = await results.insertId;

              db.query('INSERT INTO orders SET ?', { customer_id, responsible, description, type: os_type, status, initial_date}, async (error, results) => {
                  if(error) {
                      console.log(error);
                      return res.render('successMessage', {
                          errormessage: 'Erro ao cadastrar a Ordem de serviço'
                      });
                  } else {
                      console.log(results);
                      let id_os = await results.insertId;

                      db.query('INSERT INTO orders_equipments SET ?', {equipment_id: id_equip, order_id: id_os}, (error, results) => {
                          if(error){
                              console.error(error);
                              return res.render('successMessage', {
                                  errormessage: 'Erro ao vincular equipamento à ordem de serviço'
                              });
                          } else {
                              console.log(results);
                              return res.render('successMessage', {
                                  successmessage: 'Ordem de serviço cadastrada'
                              });
                          };
                      });    
                  }
              });
          }
      });
  // if old equipment
  } else if (equipment_situation == "old") {
      const { equipment_id } = req.body;

      db.query('INSERT INTO orders SET ?', { customer_id, responsible, description, type: os_type, status, initial_date}, async (error, results) => {
          if(error) {
              console.log(error);
              return res.render('successMessage', {
                  errormessage: 'Erro ao cadastrar a Ordem de serviço'
              });
          } else {
              console.log(results);
              let id_os2 = await results.insertId;

              db.query('INSERT INTO orders_equipments SET ?', {equipment_id, order_id: id_os2}, (error, results) => {
                  if(error){
                      console.error(error);
                      return res.render('successMessage', {
                          errormessage: 'Erro ao vincular equipamento à ordem de serviço'
                      });
                  } else {
                      console.log(results);
                      return res.render('successMessage', {
                          successmessage: 'Ordem de serviço cadastrada'
                      });
                  };
              });    
          }
      });
  }
  };

// os and customer Function | Função de os e cliente
  exports.newAll = (req, res) => {
  console.log(req.body);

  // Short form | forma curta:
  const { customerName, identify, telephone, adress, adressNumber, cep, adressComplement, responsible, description, os_type, status, equipment_situation} = req.body;


  db.query('SELECT * FROM customers WHERE identify = ?', [identify], (error, results) => {
      if(error) {
          console.log(error);
      }

      if(results.length > 0) {
          return res.render('osCustomerRegister', {
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


          db.query('INSERT INTO customers SET ?', { name: customerName, telephone: telephone, identify: identify, adress_id: addresses_id }, async (error, result) => {
              if(error) {
                  console.log(error);
              } else {
                  console.log(result);

              }
          
              let customer_id = await result.insertId;
              let initial_date = new Date();

              // check the type of equipment input | checar o tipo de inserção de equipamento
              // if new equipment
              if (equipment_situation == "new"){
                  const { provider_type, made, model, price, equipment_description } = req.body;
      
                  db.query('INSERT INTO equipments SET ?', { provider: provider_type, manufacturer: made, model: model, price: price, description: equipment_description}, async (error, results) => {
      
                      if(error) {
                          console.log(error);
                          return res.render('successMessage', {
                              errormessage: 'Erro ao cadastrar equipamento!'
                          });
                      } else {
                          let id_equip = await results.insertId;
      
                          db.query('INSERT INTO orders SET ?', { customer_id, responsible, description, type: os_type, status, initial_date}, async (error, results) => {
                              if(error) {
                                  console.log(error);
                                  return res.render('successMessage', {
                                      errormessage: 'Erro ao cadastrar a Ordem de serviço'
                                  });
                              } else {
                                  console.log(results);
                                  let id_os = await results.insertId;
      
                                  db.query('INSERT INTO orders_equipments SET ?', {equipment_id: id_equip, order_id: id_os}, (error, results) => {
                                      if(error){
                                          console.error(error);
                                          return res.render('successMessage', {
                                              errormessage: 'Erro ao vincular equipamento à ordem de serviço'
                                          });
                                      } else {
                                          console.log(results);
                                          return res.render('successMessage', {
                                              successmessage: 'Ordem de serviço cadastrada'
                                          });
                                      };
                                  });    
                              }
                          });
                      }
                  });
              // if old equipment
              } else if (equipment_situation == "old") {
                  const { equipment_id } = req.body;
      
                  db.query('INSERT INTO orders SET ?', { customer_id, responsible, description, type: os_type, status, initial_date}, async (error, results) => {
                      if(error) {
                          console.log(error);
                          return res.render('successMessage', {
                              errormessage: 'Erro ao cadastrar a Ordem de serviço'
                          });
                      } else {
                          console.log(results);
                          let id_os2 = await results.insertId;
      
                          db.query('INSERT INTO orders_equipments SET ?', {equipment_id, order_id: id_os2}, (error, results) => {
                              if(error){
                                  console.error(error);
                                  return res.render('successMessage', {
                                      errormessage: 'Erro ao vincular equipamento à ordem de serviço'
                                  });
                              } else {
                                  console.log(results);
                                  return res.render('successMessage', {
                                      successmessage: 'Ordem de serviço cadastrada'
                                  });
                              };
                          });    
                      }
                  });
              }
          });
      });
  });
  };

  exports.put = (req, res) => {
  console.log(req.body);

  const {order_id, responsible, os_type, description, status} = req.body;

  let param = [
      {responsible: responsible, description: description, type: os_type, status: status},
      order_id
  ];

      try {
          db.query('UPDATE orders SET ? WHERE id = ?', param, (error, results) => {
              if(error) {
                  console.log(error);
              } else {
                  console.log(results);
                  return res.render('successMessage', {
                      successmessage: 'Ordem de serviço editada'
                  });
              }
          });

      } catch (error) {
          return console.error(error);
      }
  };

