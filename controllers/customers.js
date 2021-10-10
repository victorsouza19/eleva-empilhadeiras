const db = require('../app');


// view functions || Função para listar os clientes
	exports.customers = async (req,res) => {
    try {

    db.query('SELECT c.id, c.name, c.identify, c.telephone, a.cep FROM customers as c INNER JOIN addresses as a ON c.adress_id = a.id ORDER BY c.id DESC;', async (error, rows) => {
        if(error){
            console.log(error)

        } else if(rows.length > 0) {
						console.log(rows);
            return res.render('customers/customers', {
                items: await rows 
            });


        } else {
            return res.render('customers/customers', {
                alertmessage: "Nenhum cliente cadastrado"
            })
        }
    });


    } catch (error) {
        console.log(error);
    }
  };

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

  // CRUD Functions | Funções de CRUD 
  exports.new = (req, res) => {
      console.log(req.body);

      // Short form | forma curta:
      const { customerName, identify, telephone, adress, adressNumber, cep, adressComplement} = req.body;

      db.query('SELECT * FROM customers WHERE identify = ?', [identify], (error, results) => {
          if(error) {
              console.log(error);
          }

          if(results.length > 0) {
              return res.render('customers/register', {
                  alertmessage: 'CPF/CNPJ já cadastrado',
                  customer: req.body
              });
          }  

          db.query('INSERT INTO addresses SET ?', { street: adress, number: adressNumber, cep: cep, complement: adressComplement}, async (error, results) => {
              if(error) {
                  console.log(error);
                  return res.render('successMessage', {
                      errormessage: 'Erro ao cadastrar endereço!'
                  })
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

	exports.put = (req, res) => {
    console.log(req.body);

		const { name, identify, telephone, street, number, cep, complement, customer_id, address_id } = req.body;

    let customer_param = [{name, identify, telephone}, customer_id];
		let address_param = [{street, number, cep, complement}, address_id];

        try {
            db.query('SELECT * FROM customers WHERE identify = ?', [identify], async(error, results) => {
                if(error) {
                    console.log(error);
                }
                if(results.length > 0) {
                    resultId = await results[0].id;

                    if(resultId != customer_id){
                        return res.render('customers/edit', {
                            alertmessage: 'CPF/CNPJ já cadastrado',
                            customer: req.body
                        });
                    } else {
											update();
										} 
                } else {update()} 

								function update(){
									db.query('UPDATE customers SET ? WHERE id = ?', customer_param, (error, results) => {
										if(error) {
												console.log(error);
												return res.render('successMessage', {
														errormessage: 'Erro ao editar cliente!'
												});
										} else {
												console.log(results);
												db.query('UPDATE addresses SET ? WHERE id = ?', address_param, (error, results) => {
													if(error) {
															console.log(error);
													} else {
														console.log(results);
														return res.render('successMessage', {
															successmessage: 'Cliente editado!'
														});
													}   
												});
										}
									});



								}
						});

        } catch (error) {
            return console.error(error);
        }
	};

	exports.delete = async (req, res) => {
	try {
		console.log(req.params);
		customer_id = req.params.id

		db.query('SELECT * FROM customers WHERE id = ?', [customer_id], (error, results) => {
			if (error) {
				console.log(error);
				return res.status(500).render('successMessage', {
					errormessage: 'Ocorreu um erro interno!'
				});
			}
			else if (results.length > 0) {
				let address_id = results[0].adress_id;
				
				db.query('DELETE FROM customers WHERE id = ?', [customer_id], async (error, result) => {
					if (error) {
						console.log(error);
						return res.status(500).render('successMessage', {
							errormessage: 'Erro ao apagar cliente!'
						});
					}

					else if (result) {
						console.log(result);
						db.query('DELETE FROM addresses WHERE id = ?', [address_id], async (error, result) => {
							if (error) {
								console.log(error);
								return res.status(500).render('successMessage', {
									errormessage: 'Erro ao apagar endereço!'
								});
							}
							else if (result) {
								db.query('SELECT c.id, c.name, c.identify, c.telephone, a.cep FROM customers as c INNER JOIN addresses as a ON c.adress_id = a.id ORDER BY c.id DESC;', async (error, rows) => {
									if (error) {
										console.log(error)

									} else if (rows.length > 0) {
										console.log(rows);
										return res.render('customers/customers', {
											items: await rows,
											successmessage: "Cliente apagado!"
										});


									} else {
										return res.render('customers/customers', {
											alertmessage: "Nenhum cliente cadastrado"
										})
									}
								});

							}
						});
					}
				});
			}
		});

	} catch (error) {
		console.log(error);
	}
	};

	exports.edit = async (req,res) => {
    try {
        id = req.params.id

    db.query('SELECT c.id as "customer_id", c.name, c.telephone, identify, a.id as "address_id", a.street, a.number, a.cep, a.complement  FROM customers as c INNER JOIN addresses as a ON a.id = c.adress_id WHERE c.id = ?;', [id], async (error, results) => {
        if(error){
            console.log(error);
        }  
        
        if(results.length > 0) {
            console.log(results);

            return res.render('customers/edit',{
                customer: results[0]
            });
        }
    });         

    } catch (error) {
        console.log(error);
    }
	};