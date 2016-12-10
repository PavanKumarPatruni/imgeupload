module.exports = function(res, statusCode, successful, message, data) {

    var respObj = {
        statusCode: statusCode,
        successful: successful,
        data: data,
        message: message
    };

    res.status(statusCode)
    return res.json(respObj);
}