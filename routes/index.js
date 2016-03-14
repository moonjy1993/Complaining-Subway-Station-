var express = require('express');
var router = express.Router();

/* GET home page. */

var all_complains = new Array(
	{"subwayline":"G","complaint":"The person sitting next to me was eating hard-boiled eggs in the subway car (???!!!)"},
	{"subwayline":"F","complaint":" There was a possum loose on the platform"},
	{"subwayline":"A","complaint":"The train was an hour late!"});


all_complains.reverse();

function filter_subway(input){
	var filtered= [];
	for(var i=0; i< all_complains.length; i++){
		if(all_complains[i].subwayline === input)
			filtered.push(all_complains[i]);
	}
	return filtered;
}


router.get('/', function(req, res, next) {
	var subwayline = req.query.subwayline;
	var filtered= filter_subway(subwayline);
	if(filtered.length<=0)
		filtered=all_complains;
  	res.render('index', { 'list': filtered});
});


router.get('/complain', function(req,res){
	res.render('complain', {'stat': req.session.stat});

});

router.post('/complain', function(req, res, next) {
	console.log(req.body);
	if(req.session.stat ==undefined)
		req.session.stat=1;
	else req.session.stat++;
  var complaint = req.body.complaint;
  var subwayline = req.body.subwayline;
  all_complains.unshift({"subwayline":subwayline, "complaint": complaint});
  res.redirect('/');
 
});

router.get('/stats', function(req,res){
	if(req.session.stat==undefined)
		req.session.stat=0;
	res.render('stats', {'stats': req.session.stat});
});


module.exports = router;

