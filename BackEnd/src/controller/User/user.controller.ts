import ApiResponse from "../../util/ApiResponse.js";
import { UserID } from "../../interface/interface.js";
import { User } from "../../models/User/user.model.js";
import PromiseHandler from "../../util/PromiseHandler.js";
import ApiError from "../../util/ApiError.js";
import uploadFile from "../../util/UploadAvatar.js";

export const userRegister = PromiseHandler(async (request, response, next) => {
  const { username, email, password, confirm_password, avatar }: UserID =
    request.body;

  // ***** All Fields are required ***** //
  const requiedField: boolean = [
    username,
    email,
    password,
    confirm_password,
  ].some((requiedField) => {
    requiedField?.trim() === "";
  });
  if (requiedField) {
    return next(new ApiError(400, "All Fields are Required"));
  }

  // ***** To check ConfirmPassword and Password are match *****//
  if (password !== confirm_password) {
    return next(new ApiError(400, "Confirm Password did not Match"));
  }

  // ***** To check the User Already Exitst or not? ***** //
  const userFind = await User.findOne({ $or: [{ username }, { email }] });
  if (userFind) {
    return next(new ApiError(400, "User Already Exists"));
  }

  // const avatarFilePath = request.file?.path;
  // console.log(request.file);

  // const avatar = await uploadFile(avatarFilePath);
  const user = await User.create({
    username: username?.toLowerCase(),
    email,
    password,
    confirm_password,
    avatar: avatar || "",
  });

  // ***** To check the User Create or not? ***** //
  const registerUser = await User.findById(user._id).select("-password");
  if (!registerUser) {
    return next(
      new ApiError(500, "Something Went Wrong While Creating the Account")
    );
  }
  return response
    .status(200)
    .json(new ApiResponse(200, registerUser, "User Register Successfully !!!"));
});

export const userLogin = PromiseHandler(async (request, response, next) => {
  const { email, password }: UserID = request.body;

  // ***** All Fields are required ***** //
  if (!(email || password)) {
    return next(new ApiError(400, "Email & Password is Required"));
  }

  // ***** Find the User check the Password is correct ***** //
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError(404, "User Does not Found"));
  }
  const checkPassword: boolean = await user.isPasswordCorrect(password);
  if (!checkPassword) {
    return next(new ApiError(404, "Password Does not Match"));
  }

  // ***** Login User ***** //
  const loggedUser = await User.findById(user._id).select("-password");

  return response
    .status(200)
    .json(new ApiResponse(200, loggedUser, "User Login Successfully !!!"));
});
