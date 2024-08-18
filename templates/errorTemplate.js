const errorTemplate = (req, res, pageName, title, message, errors, session) =>{
    //console.log(res);
    
    res.render(pageName, {
        pagename: title,
        body: req.body,
        errs: errors,
        message: message,
        session: session
    });
};

module.exports=errorTemplate;