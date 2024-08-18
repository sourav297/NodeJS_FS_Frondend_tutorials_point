const successTemplate = (res, pageName, title, message, session, data) =>{
    res.render(pageName, {
        pagename: title,
        message: message,
        session: session,
        data: data
    });
};

module.exports=successTemplate;