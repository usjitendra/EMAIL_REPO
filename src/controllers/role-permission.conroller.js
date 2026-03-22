const { tryCatchFn } = require("../Utils/tryCatch.utils");
const RoleModel = require("../Models/role.model");
const UserModel = require("../Models/user.model");
const PermissionModel = require("../Models/permission.model");
const responseHandler = require("../Utils/responseHandler.utils");

class RolePermissionController {

  constructor() { }

  addRole = tryCatchFn(async (req, res, next) => {

    let payload = req?.body;
    payload.createdBy = req?.user?.id;
    payload.role = payload.role.trim();
    payload.createdBy = req?.user?.id;

    const isRoleExist = await RoleModel.findOne({
      role: { $regex: `^${payload.role}$`, $options: "i" }, // Case-insensitive match
    });

    if (isRoleExist) {
      return responseHandler.errorResponse(
        res,
        400,
        "Role already exists.",
        []
      );
    }

    const permissions = await PermissionModel.find();

    const rolePermissions = permissions.map((permission) => ({
      _id: permission._id,
      module_name: permission.module_name,
      view: permission.view,
      add: permission.add,
      edit: permission.edit,
      delete: permission.delete,
    }));

    payload.permission = rolePermissions;
    const result = await RoleModel.create(payload);

    if (!result) {
      return responseHandler.errorResponse(
        res,
        500,
        "Failed to create new role .",
        []
      );
    }

    return responseHandler.successResponse(
      res,
      201,
      "Role added successfully .",
      result
    );
  });

  assignRole = tryCatchFn(async (req, res, next) => {
    const { roleId } = req?.params;

    const result = await RoleModel.findById(roleId);
    if (!result) {
      return responseHandler.errorResponse(res, 404, "Role not exist !");
    }

    const assignedRoleUser = await UserModel.findByIdAndUpdate(
      req?.user?.id,
      { $set: { role_id: result?._id } },
      { new: true }
    );

    return responseHandler.successResponse(
      res,
      200,
      "Role assigned successfully to the user.",
      assignedRoleUser
    );
  });

  editRole = tryCatchFn(async (req, res, next) => {
    let payload = req.body;
    const result = await RoleModel.findByIdAndUpdate(
      req?.params?.roleId,
      { $set: { role_id: payload.role } },
      { new: true }
    );

    return responseHandler.successResponse(
      res,
      200,
      "Role edited successfully .",
      result
    );
  });

  getAllRoles = tryCatchFn(async (req, res, next) => {
    let { page, limit, search, status, sortField, sortOrder } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    sortField = sortField || "createdAt";
    sortOrder = sortOrder === "asc" ? 1 : -1;

    let filter = { isDelete: false, role: { $ne: "super_admin" } };

    if (search) {
      filter.role = { $regex: search, $options: "i" };
    }

    if (status !== undefined) {
      const statusBool =
        status === "true" ? true : status === "false" ? false : null;

      if (statusBool !== null) {
        filter.status = statusBool;
      }
    }

    const options = {
      page,
      limit,
      sort: { [sortField]: sortOrder },
      select: "-__v",
    };

    const result = await RoleModel.paginate(filter, options);

    return responseHandler.successResponse(
      res,
      200,
      "Roles fetched successfully.",
      result
    );
  });

  addPermission = tryCatchFn(async (req, res, next) => {
    const payload = req?.body;
    const module_name = payload?.module_name?.trim();

    const isPermissionExist = await PermissionModel.findOne({
      module_name: { $regex: `^${module_name}$`, $options: "i" },
    });

    //  console.log("isPermission : ",isPermissionExist)

    if (isPermissionExist) {
      return responseHandler.errorResponse(
        res,
        400,
        `Permission with module_name '${module_name}' already exists.`,
        []
      );
    }

    // Create new permission
    const newPermission = {
      module_name,
      view: false,
      add: false,
      edit: false,
      delete: false,
    };

    //   console.log("new permssion : ",newPermission)
    const createdPermission = await PermissionModel.create(newPermission);
    newPermission._id = createdPermission._id;
    //   console.log("before await --->>")
    await RoleModel.updateMany(
      {},
      { $push: { permission: newPermission } },
      { new: true }
    );

    return responseHandler.successResponse(
      res,
      201,
      "Permission added successfully.",
      createdPermission
    );
  });

  getAllPermissions = tryCatchFn(async (req, res, next) => {

    let { page, limit, search, sortField, sortOrder } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    sortField = sortField || "createdAt";
    sortOrder = sortOrder === "asc" ? 1 : -1;

    let filter = {};

    if (search) {
      filter.module_name = { $regex: search, $options: "i" };
    }

    const options = {
      page,
      limit,
      sort: { [sortField]: sortOrder },
      select: "-__v",
    };

    const result = await PermissionModel.paginate(filter, options);

    return responseHandler.successResponse(
      res,
      200,
      "Permissions fetched successfully.",
      result
    );
  });

  getAllActive = tryCatchFn(async (req, res, next) => {
    let result = await RoleModel.find({
      isActive: true,
      isDelete: false,
    }).select("role");
    return responseHandler.successResponse(
      res,
      200,
      "All active roles retrieved successfully .",
      result
    );
  });

  viewRolePermission = tryCatchFn(async (req, res, next) => {
    const result = await RoleModel.findById(req?.params?.roleId).select(
      "permission"
    );

    return responseHandler.successResponse(
      res,
      201,
      "Role permission retrieved successfully .",
      result
    );
  });

  // editRolePermission = tryCatchFn(async (req, res, next) => {
  //   const { roleId, permissionId } = req.params;
  //   console.log("req.params ", req.params);
  //   console.log("body: ", req.body);
  //   const result = await RoleModel.findOneAndUpdate(
  //     { _id: roleId, "permission._id": permissionId },
  //     {
  //       $set: {
  //         "permission.$": { ...req?.body, _id: permissionId },
  //       },
  //     },
  //     { new: true }
  //   );
  //   console.log("result ", result);

  //   return responseHandler.successResponse(
  //     res,
  //     200,
  //     "Role permission edited successfully .",
  //     result
  //   );
  // });
  editRolePermission = tryCatchFn(async (req, res, next) => {
    try {
      const { roleId } = req.params;
      const updatedPermissions = req.body; // Expecting an array of permissions

      // console.log("Role ID:", roleId);
      // console.log("Updated Permissions:", updatedPermissions);

      // Ensure permissions are in the correct format
      if (
        !Array.isArray(updatedPermissions) ||
        updatedPermissions.length === 0
      ) {
        return responseHandler.errorResponse(
          res,
          400,
          "Invalid permissions data."
        );
      }

      // Update permissions in the database
      const result = await RoleModel.findOneAndUpdate(
        { _id: roleId },
        {
          $set: {
            permission: updatedPermissions, // Replace entire permissions array
          },
        },
        { new: true }
      );

      if (!result) {
        return responseHandler.errorResponse(res, 404, "Role not found.");
      }

      return responseHandler.successResponse(
        res,
        200,
        "Role permissions updated successfully.",
        result
      );
    } catch (error) {
      console.error("Error updating role permissions:", error);
      return responseHandler.errorResponse(res, 500, "Internal server error.");
    }
  });

  deleteRole = tryCatchFn(async (req, res, next) => {
    const roleId = req.params.roleId;

    if (!roleId) {
      return responseHandler.errorResponse(
        res,
        400,
        "Role ID is required.",
        null
      );
    }

    const usersWithRole = await UserModel.findOne({ role_id: roleId });

    if (usersWithRole) {
      return responseHandler.errorResponse(
        res,
        400,
        "Cannot delete this role. One or more users are assigned to it.",
        null
      );
    }

    const deletedRoles = await RoleModel.findByIdAndDelete(roleId);

    if (!deletedRoles) {
      return responseHandler.errorResponse(res, 404, "Role not found..", null);
    }

    return responseHandler.successResponse(
      res,
      200,
      "Role deleted successfully.",
      null
    );
  });
}

module.exports = new RolePermissionController();
