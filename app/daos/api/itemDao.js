const itemDao = {
	table: 'store_item',
	// create: (req, res) => {
	// 	if (Object.keys(req.body).length === 0) {
	// 		res.json({
	// 			error: true,
	// 			message: "No fields to create."
	// 		});
	// 		return;
	// 	}
	// 	const fields = Object.keys(req.body);
	// 	const values = Object.values(req.body);
	// 	con.execute(
	// 		`INSERT INTO ${dao.table} SET ${fields.join(' = ?, ')} = ?;`,
	// 		values,
	// 		(err, dbres) => {
	// 			if(err) {
	// 				console.log('DAO ERROR', err);
	// 				res.send('ERROR creating record');
	// 				return;
	// 			}
	// 			res.send(`Last id: ${dbres.insertId}`);
	// 		}
	// 	);
	// },
	// update: (req, res) => {
	// 	if (isNaN(req.params.id)) {
	// 		res.json({
	// 			error: true,
	// 			message: "ID must be a number"
	// 		});
	// 		return;
	// 	}
	// 	if (Object.keys(req.body).length === 0) {
	// 		res.json({
	// 			error: true,
	// 			message: "No fields to update."
	// 		});
	// 		return;
	// 	}
	// 	const fields = Object.keys(req.body);
	// 	const values = Object.values(req.body);
	// 	con.execute(
	// 		`UPDATE actor SET ${fields.join(' = ?, ')} = ? WHERE actor_id = ?;`,
	// 		[...values, req.params.id],
	// 		(err, dbres) => {
	// 			if(err) {
	// 				console.log('DAO ERROR', err);
	// 				res.send('ERROR updating record');
	// 				return;
	// 			}
	// 			res.send(`changed: ${dbres.changedRows}`);
	// 		}
	// 	);
	// },
}

export {
	itemDao,
};
