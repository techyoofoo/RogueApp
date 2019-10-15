var mqschemas = function (messageid, message) {
    return {
        UB: {
            Header: {
                Version: "1",
                Message_ID: messageid
            },
            payload: {
                Message: message
            }

        }
    };
};

module.exports = mqschemas;