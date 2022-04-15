const express = require("express");

const router = express.Router();
const ctrlDepartment = require("../controller/ctrl.department.js");

// 등록
router.post("/", ctrlDepartment.signup);

// 리스트 조회
router.get("/", ctrlDepartment.list);

// 상세정보 조회
router.get("/info", ctrlDepartment.info);

// 수정
router.put("/edit", ctrlDepartment.edit);

// 삭제
router.delete("/delete", ctrlDepartment.deleteUser);

module.exports = router;
