import express from 'express'
import bodyParser from 'body-parser'
import * as utils from '../../common/utils'
import { getIsActiveItem } from '../../common/utils/filter';
import util from 'util'

let ObjectID = require('mongodb').ObjectID
let _configs = require('../../config/preferences');
let constRes = require('../../common/constants/response');
let moduleApi = require('../../common/constants/moduleApi');
let mwLog = require('../../middlewares/log');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


///
// connectmongo
var mgClient = require('mongodb').MongoClient;
// var ObjectID = require('mongodb').ObjectID;
var mgUrl = util.format(
  _configs.mongodb.url_format,
  encodeURIComponent(_configs.mongodb.db_usr),
  encodeURIComponent(_configs.mongodb.db_pwd),
  _configs.mongodb.host,
  _configs.mongodb.port
);
var mgUrlNoAuth = util.format(
  _configs.mongodb.url_format_no_auth,
  _configs.mongodb.host_no_auth,
  _configs.mongodb.port
);
//


function getTable(req, res) {
  let rhApiUrl = _configs.rh.dataUrl + '/tbDMDCQG' + req.url;
  utils.Axios('get', rhApiUrl)//method, url, data
    .then(function (rhApiRes) {
      mwLog.generate(req, { status: rhApiRes.status, body: rhApiRes.data });
      res.status(rhApiRes.status).send(rhApiRes.data);
    }).catch(function (rhApiErr) {
      try {
        mwLog.generate(req, { status: rhApiErr.response.status, body: rhApiErr.response.data });
        res.status(rhApiErr.response.status).send(rhApiErr.response.data);
      } catch (e) {
        res.status(constRes.RESPONSE_ERR_DATABASE.status).send(constRes.RESPONSE_ERR_DATABASE.body);
      }
    })
}

function post(req, res) {
  req.body.createdAt = new Date().getTime();
  req.body.createdBy = req.tokenObj.usr.account;
  req.body.code = new ObjectID().toHexString()
  req.body.isActive = true

  let BanGhi = JSON.parse(JSON.stringify(req.body.BanGhi))
  let CategoryCode = req.body.CategoryCode
  let rhApiUrl = _configs.rh.dataUrl + '/tbDMDCQG' + req.url;
  let rhApiBanGhiUrl = _configs.rh.dataUrl + '/tbBanGhiDMDCQG';

  req.body.BanGhi = []

  utils.Axios('post', rhApiUrl, req.body)//method, url, data
    .then(async function (rhApiRes) {
      if (rhApiRes.headers.location) {
        rhApiRes.data = {
          newId: rhApiRes.headers.location.substr(rhApiRes.headers.location.lastIndexOf('/') + 1)
        };
      }
      //xóa các bản ghi cũ
      await utils.Axios('delete', rhApiBanGhiUrl + '/*?' + `filter={"CategoryCode": "` + CategoryCode + `" }`)
      //thêm bản ghi mới với mã CategoryCode tương ứng
      BanGhi.map(async (item, index) => {
        BanGhi[index].CategoryCode = CategoryCode
      })
      await utils.AxiosNonTimeout('post', rhApiBanGhiUrl, BanGhi)

      mwLog.generate(req, { status: rhApiRes.status, body: rhApiRes.data });
      res.status(rhApiRes.status).send(rhApiRes.data);
    }).catch(function (rhApiErr) {
      try {
        mwLog.generate(req, { status: rhApiErr.response.status, body: rhApiErr.response.data });
        res.status(rhApiErr.response.status).send(rhApiErr.response.data);
      } catch (e) {
        res.status(constRes.RESPONSE_ERR_DATABASE.status).send(constRes.RESPONSE_ERR_DATABASE.body);
      }
    })

  // console.log('xxxxxxxxxx', req.body.BanGhi.length)
  // return
  // mgClient.connect(mgUrl, function (err, client) {
  //   if (err) {
  //     mwLog.generate(req, constRes.RESPONSE_ERR_DATABASE);
  //     res.status(constRes.RESPONSE_ERR_DATABASE.status).send(constRes.RESPONSE_ERR_DATABASE.body);
  //   } else {
  //     client.db(_configs.mongodb.db).collection('tbDMDCQG').save(
  //       req.body
  //     ).then(function (v) {
  //       mwLog.generate(req, v);
  //       res.status(200).send({ size: v.length, data: v });
  //     }, function (e) {
  //       mwLog.generate(req, e);
  //       res.status(constRes.RESPONSE_ERR_DATABASE.status).send(constRes.RESPONSE_ERR_DATABASE.body);
  //     })
  //   }
  // })

  // utils.Axios('post', rhApiUrl, req.body)//method, url, data
  //   .then(function (rhApiRes) {
  //     if (rhApiRes.headers.location) {
  //       rhApiRes.data = {
  //         newId: rhApiRes.headers.location.substr(rhApiRes.headers.location.lastIndexOf('/') + 1)
  //       };
  //     }
  //     mwLog.generate(req, { status: rhApiRes.status, body: rhApiRes.data });
  //     res.status(rhApiRes.status).send(rhApiRes.data);
  //   }).catch(function (rhApiErr) {
  //     try {
  //       mwLog.generate(req, { status: rhApiErr.response.status, body: rhApiErr.response.data });
  //       res.status(rhApiErr.response.status).send(rhApiErr.response.data);
  //     } catch (e) {
  //       res.status(constRes.RESPONSE_ERR_DATABASE.status).send(constRes.RESPONSE_ERR_DATABASE.body);
  //     }
  //   })
}

function put(req, res) {
  req.body.modifiedAt = new Date().getTime();
  req.body.modifiedBy = req.tokenObj.usr.account;
  let code = req.params.query;
  let BanGhi = JSON.parse(JSON.stringify(req.body.BanGhi))
  let CategoryCode = req.body.CategoryCode
  let rhApiUrl = _configs.rh.dataUrl + '/tbDMDCQG' + req.url;
  // console.log('xxxxxxxxxx', req.body.BanGhi.length)
  return
  delete req.body.code
  // return ////
  mgClient.connect(mgUrl, function (err, client) {
    if (err) {
      mwLog.generate(req, constRes.RESPONSE_ERR_DATABASE);
      res.status(constRes.RESPONSE_ERR_DATABASE.status).send(constRes.RESPONSE_ERR_DATABASE.body);
    } else {
      client.db(_configs.mongodb.db).collection('tbDMDCQG').updateOne(
        { 'code': code }, { "$set": req.body }
      ).then(function (v) {
        mwLog.generate(req, v);
        res.status(200).send({ size: v.length, data: v });
      }, function (e) {
        mwLog.generate(req, e);
        res.status(constRes.RESPONSE_ERR_DATABASE.status).send(constRes.RESPONSE_ERR_DATABASE.body);
      })
    }
  })
  // utils.Axios('put', rhApiUrl, req.body)//method, url, data
  //   .then(function (rhApiRes) {
  //     mwLog.generate(req, { status: rhApiRes.status, body: rhApiRes.data });
  //     res.status(rhApiRes.status).send(rhApiRes.data);
  //   }).catch(function (rhApiErr) {
  //     try {
  //       mwLog.generate(req, { status: rhApiErr.response.status, body: rhApiErr.response.data });
  //       res.status(rhApiErr.response.status).send(rhApiErr.response.data);
  //     } catch (e) {
  //       res.status(constRes.RESPONSE_ERR_DATABASE.status).send(constRes.RESPONSE_ERR_DATABASE.body);
  //     }
  //   })
}

function patch(req, res) {
  req.body.modifiedAt = new Date().getTime();
  req.body.modifiedBy = req.tokenObj.usr.account;
  let rhApiUrl = _configs.rh.dataUrl + '/tbDMDCQG' + req.url;
  delete req.body.code
  utils.Axios('patch', rhApiUrl, req.body)//method, url, data
    .then(function (rhApiRes) {
      mwLog.generate(req, { status: rhApiRes.status, body: rhApiRes.data });
      res.status(rhApiRes.status).send(rhApiRes.data);
    }).catch(function (rhApiErr) {
      try {
        mwLog.generate(req, { status: rhApiErr.response.status, body: rhApiErr.response.data });
        res.status(rhApiErr.response.status).send(rhApiErr.response.data);
      } catch (e) {
        res.status(constRes.RESPONSE_ERR_DATABASE.status).send(constRes.RESPONSE_ERR_DATABASE.body);
      }
    })
}

function deleteTable(req, res) {
  let rhApiUrl = _configs.rh.dataUrl + '/tbDMDCQG' + req.url;
  utils.Axios('patch', rhApiUrl, { isActive: false })//method, url, data
    .then(function (rhApiRes) {
      mwLog.generate(req, { status: rhApiRes.status, body: rhApiRes.data });
      res.status(rhApiRes.status).send(rhApiRes.data);
    }).catch(function (rhApiErr) {
      try {
        mwLog.generate(req, { status: rhApiErr.response.status, body: rhApiErr.response.data });
        res.status(rhApiErr.response.status).send(rhApiErr.response.data);
      } catch (e) {
        res.status(constRes.RESPONSE_ERR_DATABASE.status).send(constRes.RESPONSE_ERR_DATABASE.body);
      }
    })
}

function lock(req, res) {
  let rhApiUrl = _configs.rh.dataUrl + '/tbDMDCQG' + req.url;
  utils.Axios('get', rhApiUrl)//method, url, data
    .then(function (rhApiRes) {
      utils.Axios('patch', rhApiUrl, { isActive: false })//method, url, data
        .then(function (dataApiRes) {
          mwLog.generate(req, { status: dataApiRes.status, body: dataApiRes.data });
          res.status(dataApiRes.status).send(dataApiRes.data);
        }).catch(function (rhApiErr) {
          try {
            mwLog.generate(req, { status: rhApiErr.response.status, body: rhApiErr.response.data });
            res.status(rhApiErr.response.status).send(rhApiErr.response.data);
          } catch (e) {
            res.status(constRes.RESPONSE_ERR_DATABASE.status).send(constRes.RESPONSE_ERR_DATABASE.body);
          }
        })
    }).catch(function (rhApiErr) {
      try {
        mwLog.generate(req, { status: rhApiErr.response.status, body: rhApiErr.response.data });
        res.status(rhApiErr.response.status).send(rhApiErr.response.data);
      } catch (e) {
        res.status(constRes.RESPONSE_ERR_DATABASE.status).send(constRes.RESPONSE_ERR_DATABASE.body);
      }
    })
}

function checkCategoryCode(req, res) {
  req.url = req.url.replace("/check", "")
  let rhApiUrl = _configs.rh.dataUrl + '/tbDMDCQG' + req.url;
  utils.Axios('get', rhApiUrl)//method, url, data
    .then(function (rhApiRes) {
      mwLog.generate(req, { status: rhApiRes.status, body: rhApiRes.data });
      let response = rhApiRes.data && rhApiRes.data._embedded ? !!rhApiRes.data._embedded[0] : false
      res.status(rhApiRes.status).send({
        status: response,
        code: response ? rhApiRes.data._embedded[0].code : null,
        _id: response ? rhApiRes.data._embedded[0]._id : null
      });
    }).catch(function (rhApiErr) {
      try {
        mwLog.generate(req, { status: rhApiErr.response.status, body: rhApiErr.response.data });
        res.status(rhApiErr.response.status).send(rhApiErr.response.data);
      } catch (e) {
        res.status(constRes.RESPONSE_ERR_DATABASE.status).send(constRes.RESPONSE_ERR_DATABASE.body);
      }
    })
}

export { getTable, post, patch, put, deleteTable, lock, checkCategoryCode }