const { promisify } = require('util');
const db = require('../app');

exports.equipments = async (req,res) => {
    try {

    db.query('SELECT id, provider, manufacturer, price, model FROM equipments ORDER BY id DESC;', async (error, rows) => {
        if(error){
            console.log(error)

        } else if(rows.length > 0) {
            return res.render('equipments/equipments', {
                items: rows 
            });


        } else {
            return res.render('equipments/equipments', {
                alertmessage: "Nenhum equipamento cadastrado"
            })
        }
    });


    } catch (error) {
        console.log(error);
    }
};

exports.put = (req, res) => {
    console.log(req.body);

    const { provider_type, made, model, price, description, equipment_id } = req.body;

    let param = [
        {provider: provider_type, manufacturer: made, model, price, description},
        equipment_id
    ];

        try {
            db.query('UPDATE equipments SET ? WHERE id = ?', param, (error, results) => {
                if(error) {
                    console.log(error);
                    return res.render('successMessage', {
                        errormessage: 'Erro ao editar equipamento!'
                    });
                } else {
                    console.log(results);
                    return res.render('successMessage', {
                        successmessage: 'Equipamento editado!'
                    });
                }
            });

        } catch (error) {
            return console.error(error);
        }
};

exports.delete = async (req,res) => {
    try {
        console.log(req.params.id);
        id = req.params.id

        db.query('SELECT * FROM orders_equipments WHERE equipment_id = ?', [id], (error, results) => {
            if(error){
                console.log(error);
                return res.render(500, 'successMessage',{
                    errormessage: 'Ocorreu um erro interno!'
                });
            }

            else if(results.length > 0){
                return res.render('successMessage',{
                    errormessage: 'Equipamentos vinculados à uma ordem de serviço não podem ser excluídos.'
                });
            } else {

                db.query('DELETE FROM equipments WHERE id = ?', [id], async (error, result) => {
                    if(error){
                        return console.log(error);
                    }  
                    
                    else if(result) {
                        console.log(result);
                        db.query('SELECT id, provider, manufacturer, price, model FROM equipments ORDER BY id DESC;', async (error, rows) => {
                            if(error){
                                console.log(error)
                
                            } else if(rows.length > 0) {
                                return res.render('equipments/equipments', {
                                    items: rows, 
                                    successmessage: "Equipamento apagado!"
                                });
                
                
                            } else {
                                return res.render('equipments/equipments', {
                                    alertmessage: "Nenhum equipamento cadastrado"
                                })
                            }
                        });
                    }
                }); 

            };
        });

             

    } catch (error) {
        console.log(error);
    }
};

exports.new = (req, res) => {
    console.log(req.body);

    const { provider_type, made, model, price, description } = req.body;
    console.log(provider_type);

    db.query('INSERT INTO equipments SET ?', { manufacturer: made, model: model, price: price, description: description, provider: provider_type}, (error, results) => {

        if(error) {
            console.log(error);
            return res.render('successMessage', {
                errormessage: 'Erro ao cadastrar equipamento!'
            });
        } else {
            console.log(results);
            return res.render('successMessage', {
                successmessage: 'Equipamento cadastrado'
            });
        }
    });
};

exports.edit = async (req,res) => {
    try {
        id = req.params.id

    db.query('SELECT * FROM equipments WHERE id = ?', [id], async (error, result) => {
        if(error){
            console.log(error);
        }  
        
        if(result.length > 0) {
            console.log(result);
            let providerType;

            if(result[0].provider == "Eleva"){
                providerType = true;
            } else if (result[0].provider == "Terceiro"){
                providerType = false;
            };

            return res.render('equipments/edit',{
                providerType,
                equipment: result[0]
            });
        }
    });         

    } catch (error) {
        console.log(error);
    }
};

