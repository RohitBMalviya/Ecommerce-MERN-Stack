import ApiError from "../util/ApiError.js";
import PromiseHandler from "../util/PromiseHandler.js";

export const authorizedRole = (...roles: string[]) => {
  return PromiseHandler(async (request, _response, next) => {
    // ***** To Check wheathe it is Admin or User if Admin than Allow***** //
    if (!roles.includes(request.user.role)) {
      return next(new ApiError(403, "UnAuthorized Only Adim can Access"));
    }
    next();
  });
};
