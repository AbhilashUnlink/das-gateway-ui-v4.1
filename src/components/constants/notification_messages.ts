type success_type =  {
    ACTION_VOID_AUTHORIZATION: string;
    ACTION_CAPTURE: string;
    ACTION_REFUND: string;
    ACTION_DELETE_RULE: string;
};

type failure_type = success_type &  {
    ACTION_NOTAUTHORIZED: string;
    ACTION_INVALID_USER: string;
}


const SUCCESS:success_type = {
        "ACTION_VOID_AUTHORIZATION": "The transaction is voided succesfully.",
        "ACTION_CAPTURE": "The amount is captured successfully.",
        "ACTION_REFUND": "The amount is refunded successfully.",
        "ACTION_DELETE_RULE": "The deletion of rule was successful."
    },

    FAILURE:failure_type = {
        "ACTION_VOID_AUTHORIZATION": "The void transaction is not successful.",
        "ACTION_CAPTURE": "The capture of the given amount was unsuccessful!",
        "ACTION_REFUND": "The refund of the given amount was unsuccessful!",
        "ACTION_DELETE_RULE": "The deletion of rule was unsuccessful.",
        "ACTION_NOTAUTHORIZED": "Session Timeout. Please login again.",
        "ACTION_INVALID_USER": "Invalid username or password."
    };

export {SUCCESS, FAILURE};
