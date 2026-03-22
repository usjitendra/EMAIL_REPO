const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/auth.middleware");
const rolePermissionController = require("../controllers/role-permission.conroller");

router.post(
  "/assign-role/:roleId",

  rolePermissionController.assignRole
);
router.post("/role/add", rolePermissionController.addRole);

router.post(
  "/role/edit/:roleId",
  // authMiddleware,
  rolePermissionController.editRole
);

// router.post("/role/delete/:id", rol);

router.get("/role/list", rolePermissionController.getAllRoles);

router.get(
  "/role/active",
  authMiddleware,
  rolePermissionController.getAllActive
);

router.post("/permission/add", rolePermissionController.addPermission);

router.post(
  "/role/permission/view/:roleId",
  authMiddleware,
  rolePermissionController.viewRolePermission
);

router.post(
  "/role/permission/edit/:roleId",
  authMiddleware,
  rolePermissionController.editRolePermission
);

router.get(
  "/get-all-permission",
  authMiddleware,
  rolePermissionController.getAllPermissions
);

router.delete(
  "/role/delete-role/:roleId",
  // authMiddleware,
  rolePermissionController.deleteRole
);

module.exports = router;
