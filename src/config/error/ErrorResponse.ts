type ItemType = {
  code: number;
  message: string;
  description: string;
  buttontext: string;
};
type ErrorResponseType = {
  error404: ItemType[];
  error500: ItemType[];
  error400: ItemType[];
};

const ErrorResponse: ErrorResponseType = {
  error404: [
    {
      code: 404,
      message: "Page Not found",
      description:
        "Sorry, the page you are looking for cannot be found or no longer exists.",
      buttontext: "Go Back To Homapage",
    },
  ],
  error500: [
    {
      code: 500,
      message: "Internal Server Error",
      description: "Sorry we are experiencing technical problems.",
      buttontext: "Go Back To Homapage",
    },
  ],
  error400: [
    {
      code: 500,
      message: "Internal Server Error",
      description: "Sorry we are experiencing technical problems.",
      buttontext: "Go Back To Homapage",
    },
  ],
};
export default ErrorResponse;
