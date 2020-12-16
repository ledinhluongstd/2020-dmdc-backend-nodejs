import express from 'express'
import bodyParser from 'body-parser'
import * as controller from '../controller/data'

let tbDanhMucUngDungRouter = require('./data/tbDanhMucUngDung');
let tbDonViRouter = require('./data/tbDonVi');
let tbDonViHanhChinhRouter = require('./data/tbDonViHanhChinh');
let tbLinhVucRouter = require('./data/tbLinhVuc');
let tbLogRouter = require('./data/tbLog');
let tbLogApiRouter = require('./data/tbLogApi');
let tbLogDMDCQGApiRouter = require('./data/tbLogDMDCQGApi');
let tbMenuRouter = require('./data/tbMenu');
let tbNhomQuyenRouter = require('./data/tbNhomQuyen');
let tbNhomQuyenNguoiDungRouter = require('./data/tbNhomQuyenNguoiDung');
let tbThongTinUngDungRouter = require('./data/tbThongTinUngDung');
let tbUsersRouter = require('./data/tbUsers');
let tbNhomDanhMucRouter = require('./data/tbNhomDanhMuc');
let tbDanhMucRouter = require('./data/tbDanhMuc');
let tbThuocTinhDanhMucRouter = require('./data/tbThuocTinhDanhMuc');
let tbYKienDongGopRouter = require('./data/tbYKienDongGop');
let tbThongKeRouter = require('./data/tbThongKe');
let tbDMDCQGRouter = require('./data/tbDMDCQG');

let importExcelRouter = require('./data/importExcel');

let mwJWT = require('../middlewares/jwt');
let mwLog = require('../middlewares/log');
let mwJson = require('../middlewares/json');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use('/tbDanhMucUngDung', tbDanhMucUngDungRouter);
router.use('/tbDonVi', tbDonViRouter);
router.use('/tbDonViHanhChinh', tbDonViHanhChinhRouter);
router.use('/tbLinhVuc', tbLinhVucRouter);
router.use('/tbLog', tbLogRouter);
router.use('/tbLogApi', tbLogApiRouter);
router.use('/tbLogDMDCQGApi', tbLogDMDCQGApiRouter);
router.use('/tbMenu', tbMenuRouter);
router.use('/tbNhomQuyen', tbNhomQuyenRouter);
router.use('/tbNhomQuyenNguoiDung', tbNhomQuyenNguoiDungRouter);
router.use('/tbThongTinUngDung', tbThongTinUngDungRouter);
router.use('/tbUsers', tbUsersRouter);
router.use('/tbNhomDanhMuc', tbNhomDanhMucRouter);
router.use('/tbDanhMuc', tbDanhMucRouter);
router.use('/tbThuocTinhDanhMuc', tbThuocTinhDanhMucRouter);
router.use('/tbYKienDongGop', tbYKienDongGopRouter);
router.use('/tbThongKe', tbThongKeRouter);
router.use('/tbDMDCQG', tbDMDCQGRouter);

router.use('/import-excel', importExcelRouter);

router.get('/', mwJWT.checkApiAuthorization, mwLog.generateLogApi, controller.get);

// router.get('/:clt\*', mwJWT.checkApiAuthorization, mwLog.generateLogApi,controller.getTable);

// router.post('/:clt', mwJson.checkJson, mwJWT.checkApiAuthorization, mwLog.generateLogApi, controller.post);

// router.put('/:clt/:query', mwJson.checkJson, mwJWT.checkApiAuthorization, mwLog.generateLogApi, controller.put);

// router.patch('/:clt/:query', mwJson.checkJson, mwJWT.checkApiAuthorization, mwLog.generateLogApi,controller.patch);

// router.delete('/:clt/:query', mwJWT.checkApiAuthorization, mwLog.generateLogApi, controller.deleteTable);

// router.lock('/:clt/:query', mwJWT.checkApiAuthorization, mwLog.generateLogApi, controller.lock);

module.exports = router;