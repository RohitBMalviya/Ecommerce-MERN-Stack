import ApiResponse from "../../util/ApiResponse.js";
import { ExtendJwtPayload, UserID } from "../../interface/interface.js";
import { User } from "../../models/User/user.model.js";
import PromiseHandler from "../../util/PromiseHandler.js";
import ApiError from "../../util/ApiError.js";
import uploadFile from "../../util/UploadAvatar.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../util/sendEmail.js";
import crypto from "crypto";

const generateAccessandRefreshToken = async (userID: Object) => {
  try {
    const user = await User.findById(userID);
    if (!user) {
      throw new ApiError(404, "User Not Found");
    }
    const accessToken: string = user?.generateAccessToken();
    const refreshToken: string = user?.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating the tokens");
  }
};

export const userRegister = PromiseHandler(async (request, response, next) => {
  const { username, email, password, confirm_password, avatar, role }: UserID =
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
    role,
  });

  // ***** To check the User Create or not? ***** //
  const registerUser = await User.findById(user._id).select("-password");
  if (!registerUser) {
    return next(
      new ApiError(500, "Something Went Wrong While Creating the Account")
    );
  }
  return response
    .status(201)
    .json(new ApiResponse(201, registerUser, "User Register Successfully !!!"));
});

export const userLogin = PromiseHandler(async (request, response, next) => {
  const { email, password }: UserID = request.body;

  // ***** All Fields are required ***** //
  if (!(email || password)) {
    return next(new ApiError(400, "Email & Password is Required"));
  }

  // ***** Find the User & check the Password is correct ***** //
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
    "-password -refreshToken "
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
    .cookie("accessToken", 0)
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
    ).select("-password -refreshToken ");
    return response
      .status(200)
      .json(new ApiResponse(200, user, "User Detail Updated Successfully !!!"));
  }
);

// For Admin to Update User Role
export const updateUserRole = PromiseHandler(
  async (request, response, next) => {
    // ***** Find the User and Update the Detail ***** //
    const { role }: UserID = request.body;
    if (!role) {
      return next(new ApiError(401, "Fields is required"));
    }
    const user = await User.findByIdAndUpdate(
      request.params.id,
      {
        $set: { role: role },
      },
      { new: true }
    ).select("-password -refreshToken ");
    return response
      .status(200)
      .json(new ApiResponse(200, user, "User Detail Updated Successfully !!!"));
  }
);

// For Admin to Delete User Info
export const deleteUserInfo = PromiseHandler(
  async (request, response, next) => {
    // ***** Find the User and Delete the Detail ***** //
    const user = await User.findByIdAndDelete(request.params.id);
    if (!user) {
      return next(new ApiError(404, "User Not Found"));
    }
    return response
      .status(200)
      .json(new ApiResponse(200, {}, "User Deleted Successfully !!!"));
  }
);

// For Admin all User
export const getAllUser = PromiseHandler(async (_request, response) => {
  const allUser = await User.find();

  return response
    .status(200)
    .json(new ApiResponse(200, allUser, "All User Fetch Successfully !!!"));
});

// For Adim Single User
export const getSingleUser = PromiseHandler(async (request, response, next) => {
  // ***** Find the User if Exist ***** //
  const user = await User.findById(request.params.id);
  if (!user) {
    return next(
      new ApiError(404, `User Not Found with id ${request.params.id}`)
    );
  }
  return response
    .status(200)
    .json(new ApiResponse(200, user, "User Fetch Successfully !!!"));
});

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

export const refreshAccessToken = PromiseHandler(
  async (request, response, next) => {
    // ***** Get token and check token exist ***** //
    const incommingToken =
      request.cookies?.refreshToken || request.body.refreshToken;
    if (!incommingToken) {
      return next(new ApiError(401, "UnAuthorized Request"));
    }

    try {
      // ***** Decode the Token ***** //
      const decodeToken = jwt.verify(
        incommingToken,
        process.env.REFRESHTOKENKEY!
      ) as ExtendJwtPayload;

      // ***** Find the User ***** //
      const user = await User.findById(decodeToken?._id);
      if (!user) {
        return next(new ApiError(404, "User Not Found"));
      }

      // ***** check the incomming and user save refreshtoken is equal or not ***** //
      if (incommingToken !== user?.refreshToken) {
        return next(new ApiError(401, "UnAuthorized Token is Expired or Used"));
      }

      // ***** Generate new Access and Refresh Token ***** //
      const { accessToken, refreshToken: newRefreshToken } =
        await generateAccessandRefreshToken(user._id);

      const options = {
        httpOnly: true,
        secure: true,
      };

      return response
        .cookie("accessToken", accessToken, options)
        .cookie("newRefreshToken", newRefreshToken, options)
        .status(200)
        .json(
          new ApiResponse(
            200,
            { accessToken, newRefreshToken },
            "Access Token Refresh Successfully !!!"
          )
        );
    } catch (error: any) {
      return next(new ApiError(400, error?.message || "Invalid refresh Token"));
    }
  }
);

export const userForgotPassword = PromiseHandler(
  async (request, response, next) => {
    const { email } = request.body;
    // ***** Find the User if Exist ***** //
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError(404, "User Not Found"));
    }

    // ***** Get ResetPassword Token and Save in userSchema ***** //
    const resetToken = user.generateResetPassword();

    await user.save({ validateBeforeSave: false });

    // ***** resetPassword Url and send message to user using nodemailer ***** //
    const resetPasswordUrl: string = `${request.protocol}://${request.get(
      "host"
    )}/api/v1/users/resetpassword/${resetToken}`;
    const message: string = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then Please ignore`;
    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce Passsword Recovery`,
        message: message,
      });
      return response
        .status(200)
        .json(
          new ApiResponse(
            200,
            {},
            `Email Send to ${user.email} Successfully !!!`
          )
        );
    } catch (error: any) {
      // ***** if not exist then undefined password and expiry date ***** //
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ApiError(500, `${error.message}`));
    }
  }
);

export const userResetPassword = PromiseHandler(
  async (request, response, next) => {
    const { password, confirm_password } = request.body;
    // ***** Creating token hash ***** //
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(request.params?.token!)
      .digest("hex");

    // ***** Find the User & check the Password is correct ***** //
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(new ApiError(400, "Reset password expired or invalid"));
    }
    if (password !== confirm_password) {
      return next(new ApiError(400, "Confirm Password did not Match"));
    }

    // ***** To regenerate the access and refresh Token when password reset ***** //
    const { accessToken, refreshToken } = await generateAccessandRefreshToken(
      user._id
    );
    const options = {
      httpOnly: true,
      secure: true,
    };

    // ***** Find the User and send response ***** //
    const findUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!findUser) {
      return next(new ApiError(404, "User Not Found"));
    }

    // ***** After Password reset set the resetpassword and expire date to null so that no one can change the password again unless it request again for forgot password  ***** //
    user.password = password;
    user.confirm_password = confirm_password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return response
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .status(200)
      .json(new ApiResponse(200, findUser, "Password Reset Successfully !!!"));
  }
);
