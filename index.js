const express = require('express');
const path = require('path');
const parse = require('body-parser');
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

function getStampedLetterPrice(weight) {
	if (weight <= 1) {
		return 0.50;
	} else if (weight > 1 && weight <= 2) {
		return 0.71;
	} else if (weight > 2 && weight <= 3) {
		return 0.92;
	} else if (weight > 3 && weight <= 3.5) {
		return 1.13;
	} else {
		return getLargeEnvelopePrice(weight);
	}
}

function getMeteredLetterPrice(weight) {
	if (weight <= 1) {
		return 0.47;
	} else if (weight > 1 && weight <= 2) {
		return 0.68;
	} else if (weight > 2 && weight <= 3) {
		return 0.89;
	} else if (weight > 3 && weight <= 3.5) {
		return 1.10;
	} else {
		return getLargeEnvelopePrice(weight);
	}
}

function getLargeEnvelopePrice(weight) {
	switch(Math.round(weight)) {
		case 1:
			return 1.00;
			break;
		case 2:
			return 1.21;
			break;
		case 3:
			return 1.42;
			break;
		case 4:
			return 1.63;
			break;
		case 5:
			return 1.84;
			break;
		case 6:
			return 2.05;
			break;
		case 7:
			return 2.26;
			break;
		case 8:
			return 2.47;
			break;
		case 9:
			return 2.68;
			break;
		case 10:
			return 2.89;
			break;
		case 11:
			return 3.10;
			break;
		case 12:
			return 3.31;
			break;
		case 13:
			return 3.52;
			break;
		default:
			return 0;
			break;
	}
}

function getFirstClassPackagePrice(weight) {
	switch(Math.round(weight)) {
		case 1:
			return 3.50;
			break;
		case 2:
			return 3.50;
			break;
		case 3:
			return 3.50;
			break;
		case 4:
			return 3.50;
			break;
		case 5:
			return 3.75;
			break;
		case 6:
			return 3.75;
			break;
		case 7:
			return 3.75;
			break;
		case 8:
			return 3.75;
			break;
		case 9:
			return 4.10;
			break;
		case 10:
			return 4.45;
			break;
		case 11:
			return 4.80;
			break;
		case 12:
			return 5.15;
			break;
		case 13:
			return 5.50;
			break;
		default:
			return 0;
			break;
	}
}

function calculateRate(mailType, weight) {
	switch(mailType) {
		case 'StampedLetter':
			return getStampedLetterPrice(weight);
			break;
		case 'MeteredLetter':
			return getMeteredLetterPrice(weight);
			break;
		case 'LargeEnvelope':
			return getLargeEnvelopePrice(weight);
			break;
		case 'FirstClassPackage':
			return getFirstClassPackagePrice(weight);
			break;
		default:
		return 0;
			break;
	}


}