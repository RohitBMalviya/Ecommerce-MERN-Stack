import ApiResponse from "../../util/ApiResponse.js";
import { UserID } from "../../interface/interface.js";
import { User } from "../../models/User/user.model.js";
import PromiseHandler from "../../util/PromiseHandler.js";
import ApiError from "../../util/ApiError.js";
import uploadFile from "../../util/UploadAvatar.js";

const generateAccessandRefreshToken = async (userID: Object) => {
  try {
    const user = await User.findById(userID);
    if (!user) {
      throw new ApiError(404, "User Not Found");
    }
    const accessToken = user?.generateAccessToken();
    const refreshToken = user?.generateRefreshToken();
    user.refreshToken = refreshToken!;
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating the tokens");
  }
};

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
  const userExist = await User.findOne({ $or: [{ username }, { email }] });
  if (userExist) {
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
    avatar: {
      public_id: "this is sample id",
      url: "this is sample url",
    },
  });

  // ***** To check the User Create or not? ***** //
  const registerUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
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

  // ***** Find the User  & check the Password is correct ***** //
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError(404, "User Does not Found"));
  }
  const checkPassword: boolean = await user.isPasswordCorrect(password);
  if (!checkPassword) {
    return next(new ApiError(401, "Password Does not Match"));
  }

  // ***** Generate Access and Refresh Token ***** //
  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user._id
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  // ***** Login User ***** //
  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  return response
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedUser,
          accessToken,
          refreshToken,
        },
        "User Login Successfully !!!"
      )
    );
});

export const userLogout = PromiseHandler(async (request, response) => {
  // ***** Find the User and Update the RefreshToken to logout to create new Session ***** //
  await User.findByIdAndUpdate(
    request.user?._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return response
    .cookie("accessToken", options)
    .cookie("refreshToken", options)
    .status(200)
    .json(new ApiResponse(200, {}, "User Logout Successfully !!!"));
});

export const updatePassword = PromiseHandler(
  async (request, response, next) => {
    // ***** All Fields are required and Check the newPassword === newconfirmPassword ***** //
    const { oldPassword, newPassword, newConfirmPassword } = request.body;
    if (!(oldPassword && newPassword && newConfirmPassword)) {
      return next(new ApiError(401, "All Fields are required"));
    }
    if (newPassword !== newConfirmPassword) {
      return next(new ApiError(401, "Password Does not match"));
    }

    // ***** Find the User  & check the Password is correct ***** //
    const user = await User.findById(request.user?._id);
    if (!user) {
      return next(new ApiError(404, "User Not Found"));
    }
    const checkPassword: boolean = await user.isPasswordCorrect(oldPassword);
    if (!checkPassword) {
      return next(new ApiError(401, "Password is Invalid"));
    }

    user.password = newPassword;
    user.confirm_password = newConfirmPassword;
    await user.save({ validateBeforeSave: false });

    return response
      .status(200)
      .json(new ApiResponse(200, {}, "Password Change Successfully !!!"));
  }
);

export const updateUserInfo = PromiseHandler(
  async (request, response, next) => {
    // ***** Find the User and Update the Detail ***** //
    const { username, email }: UserID = request.body;
    if (!(username || email)) {
      return next(new ApiError(401, "Fields are required"));
    }
    const user = await User.findByIdAndUpdate(
      request.user?._id,
      {
        $set: { username: username, email: email },
      },
      { new: true }
    ).select("-password -refreshToken");
    return response
      .status(200)
      .json(new ApiResponse(200, user, "User Detail Updated Successfully !!!"));
  }
);

export const getCurrentUser = PromiseHandler(
  async (request, response, next) => {
    // ***** Find the User if Exist ***** //
    const user = await User.findById(request.user._id);
    if (!user) {
      return next(new ApiError(404, "User Not Found"));
    }
    return response
      .status(200)
      .json(new ApiResponse(200, user, "User Fetch Successfully !!!"));
  }
);
