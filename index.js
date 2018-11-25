const express = require('express');
const path = require('path');
const parse = require('body-parser');
require('usps/usps-model.js');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.use(parse.urlencoded({extended : true}));
app.post('/formData', (req, res) => {
	var mailType = req.body.mailType;
	var weight = req.body.weight;
	var price = calculateRate(mailType, weight);

	res.render('pages/response', {
		mailType: mailType,
		packageWeight: weight,
		packagePrice: price
	});
});

app.get('/getRate', (req, res) => res.render('pages/response'));