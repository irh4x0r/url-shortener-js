const validUrl = require('valid-url');
const shortid = require('shortid'); // to generate short id's
const asyncHandler = require('../middlewares/async'); // middleware to handle async
const Url = require('../models/url');


exports.create = asyncHandler(async (req, res, next) => {
    const {longUrl} = req.body; // getting the Url from User
    const baseUrl = "http://localhost:7000"; 
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json("invalid base url"); // check if url is valid or not
    }
    const urlCode = shortid.generate(); // generating short id to use as Url code
    if(validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl }); // check if url is already is in database and if it is return the url
            if(url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode; // create short url from base url and url code and save it to DB
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json("server error");
        }

    } else {
        res.status(401).json("invalid long url");
    }

})


exports.get = asyncHandler(async (req, res, next) => {

    const url = await Url.findOne({ urlCode: req.params.code }); //find the url by url code in DB

    if (url) {
        return res.redirect(url.longUrl);// check if we got the url code in db and redirect to long url
    } else {
        return res.status(404).json('No url found');
    }

    });

exports.custom = asyncHandler(async (req, res, next) => {
    const baseUrl = "http://localhost:7000";
    const {customUrl} = req.body // custom url from user
    const urlCode = req.params.code;
    const shortUrl = baseUrl + '/' + customUrl;

    const url = await Url.findOne( {urlCode} );
    
    if(!url) {
        res.status(404).send()
        return;
    }

    url.urlCode = customUrl // change generated url code with custom one
    url.shortUrl = shortUrl
    await url.save()

    return res.send(shortUrl);

});
