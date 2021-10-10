const bcrypt = require('bcryptjs');
const db = require('../app');


// View
  exports.users = async (req,res) => {
    try {

    db.query('SELECT id, name, email, role FROM users ORDER BY id DESC;', async (error, rows) => {
        if(error){
            console.log(error)

        } else if(rows.length > 0) {
            return res.render('users/users', {
                items: rows 
            });


        } else {
            return res.render('users/users', {
                alertmessage: "Nenhum usuário cadastrado"
            })
        }
    });


    } catch (error) {
        console.log(error);
    }
	};

// CRUD

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
              alertmessage: 'Este e-mail já está em uso',
							users: { name, email, role }
          })
      } else if( password !== passwordConfirm ) {
          return res.render('users/register', {
              alertmessage: 'As senhas não coincidem',
							users: { name, email, role }
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

exports.put  = async (req, res) => {
	try {
    console.log(req.body);
		const { user_id, name, email, role, password, passwordConfirm } = req.body;

		db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
			if(error) {
					console.log(error);
			}
			
			if(results.length > 0) {
				resultUserId = results[0].id;

				if (resultUserId != user_id){
          return res.render('users/edit', {
              alertmessage: 'Este e-mail já está em uso',
							users: { user_id, name, email, role }
          })
				}
			}  
			if(password != '' || passwordConfirm != '') {

					if( password !== passwordConfirm ) {
						return res.render('users/edit', {
								alertmessage: 'As senhas não coincidem',
								users: { user_id, name, email, role }
						});
		
					} else {
						console.log('cheguei aqui');
						// Encriptando a senha
						let hashedPassword = await bcrypt.hash(password, 8);
						console.log(hashedPassword);
		
						let param = [{name, email, role, password: hashedPassword}, user_id];
		
						db.query('UPDATE users SET ? WHERE id = ?', param, (error, results) => {
							if(error) {
									console.log(error);
									return res.render('successMessage', {
											errormessage: 'Erro ao editar usuário!'
									});
							} else {
									console.log(results);
									return res.render('successMessage', {
											successmessage: 'Usuário editado!'
									});
							}
						});
					}
		
				} else if(password == '' && passwordConfirm == ''){
					let param = [{name, email, role}, user_id];
		
						db.query('UPDATE users SET ? WHERE id = ?', param, (error, results) => {
							if(error) {
									console.log(error);
									return res.render('successMessage', {
											errormessage: 'Erro ao editar usuário!'
									});
							} else {
									console.log(results);
									return res.render('successMessage', {
											successmessage: 'Usuário editado!'
									});
							}
						});
				}
		});
						
} catch (error) {
  return console.error(error);
}

}

exports.delete = async (req,res) => {
    try {
        console.log(req.params.id);
        user_id = req.params.id

				if(user_id == 1){
          return res.status(401).render( 'successMessage',{
          	errormessage: 'Usuário administrador, impossível apagar!'
          });

				} else {
          db.query('DELETE FROM users WHERE id = ?', [user_id], async (error, result) => {
            if(error){
              return console.log(error);
            }  
                    
            else if(result) {
              console.log(result);
              db.query('SELECT id, name, email, role FROM users ORDER BY id DESC;', async (error, rows) => {
								if(error){
										console.log(error)
				
								} else if(rows.length > 0) {
										return res.status(200).render('users/users', {
												items: rows,
												successmessage: 'Usuário apagado!' 
										});
				
				
								} else {
										return res.render('users/users', {
												alertmessage: "Nenhum usuário cadastrado"
										})
								}
						});       
            }
        	}); 
				};    

    } catch (error) {
        console.log(error);
    }
};

exports.edit = async (req,res) => {
    try {
        user_id = req.params.id

    db.query('SELECT * FROM users WHERE id = ?', [user_id], async (error, result) => {
        if(error){
            console.log(error);
        }  
        
        if(result.length > 0) {
            console.log(result);

            return res.render('users/edit',{
                users: result[0]
            });
        }
    });         

    } catch (error) {
        console.log(error);
    }
};