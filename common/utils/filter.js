let _configs = require('../../config/preferences');
import * as utils from './index'
import { regexText } from './regex';

function getIsActiveItem(req) {
  if (!!req.tokenObj && !!req.tokenObj.roles && req.tokenObj.roles === _configs.super.roles) {
    return req.url
  } else {
    let query = req.url.replace('/?', '');
    query = new URLSearchParams(query)
    let filter = query.get('filter')
    let count = query.get('count')
    if (!count) return req.url
    if (filter) {
      filter = JSON.parse(filter)
      filter.isActive = true
      query.set('filter', JSON.stringify(filter))
    } else {
      filter = { isActive: true }
      query.set('filter', JSON.stringify(filter))
    }
    query = '/?' + query
    return query
  }
};

async function getDanhSachPhanCapDonVi(req) {
  if (!!req.tokenObj && !!req.tokenObj.roles && req.tokenObj.roles === _configs.super.roles) {
    return req.url
  } else {
    let { account } = req.tokenObj.usr
    let rhApiUrl = _configs.rh.dataUrl + "/tbUsers?filter={account:'" + account + "'}";
    let DonVi = await utils.Axios('get', rhApiUrl)
      .then(function (rhApiRes) {
        return rhApiRes.data._embedded[0].DonVi
      }).catch(function (rhApiErr) {
        return null
      })

    let query = req.url.replace('/?', '');
    query = new URLSearchParams(query)
    let filter = query.get('filter')
    let count = query.get('count')
    if (!count) return req.url
    if (filter) {
      filter = JSON.parse(filter)
      filter['isActive'] = true
      filter['codeTree'] = regexText(DonVi.codeTree)
      query.set('filter', JSON.stringify(filter))
    } else {
      filter = { isActive: true, codeTree: regexText(DonVi.codeTree || '') }
      query.set('filter', JSON.stringify(filter))
    }
    query = '/?' + query
    return query
  }
}

async function getDanhSachPhanCapNhomDanhMuc(req) {
  if (!!req.tokenObj && !!req.tokenObj.roles && req.tokenObj.roles === _configs.super.roles) {
    return req.url
  } else {
    let { account } = req.tokenObj.usr
    let rhApiUrl = _configs.rh.dataUrl + "/tbUsers?filter={account:'" + account + "'}";
    let DonVi = await utils.Axios('get', rhApiUrl)
      .then(function (rhApiRes) {
        return rhApiRes.data._embedded[0].DonVi
      }).catch(function (rhApiErr) {
        return null
      })

    let query = req.url.replace('/?', '');
    query = new URLSearchParams(query)
    let filter = query.get('filter')
    let count = query.get('count')
    if (!count) return req.url
    if (filter) {
      filter = JSON.parse(filter)
      filter['isActive'] = true
      filter['DonViCha.codeTree'] = regexText(DonVi.codeTree)
      // filter['codeTree'] = regexText(DonVi.codeTree)
      query.set('filter', JSON.stringify(filter))
    } else {
      filter = { isActive: true, 'DonViCha.codeTree': regexText(DonVi.codeTree || '') }
      query.set('filter', JSON.stringify(filter))
    }
    query = '/?' + query
    return query
  }
}

async function getDanhSachPhanCapDanhMuc(req) {
  if (!!req.tokenObj && !!req.tokenObj.roles && req.tokenObj.roles === _configs.super.roles) {
    return req.url
  } else {
    let { account } = req.tokenObj.usr
    let rhApiUrl = _configs.rh.dataUrl + "/tbUsers?filter={account:'" + account + "'}";
    let DonVi = await utils.Axios('get', rhApiUrl)
      .then(function (rhApiRes) {
        return rhApiRes.data._embedded[0].DonVi
      }).catch(function (rhApiErr) {
        return null
      })

    let query = req.url.replace('/?', '');
    query = new URLSearchParams(query)
    let filter = query.get('filter')
    let count = query.get('count')
    if (!count) return req.url
    if (filter) {
      filter = JSON.parse(filter)
      filter['isActive'] = true
      filter['DonViCha.codeTree'] = regexText(DonVi.codeTree)
      // filter['codeTree'] = regexText(DonVi.codeTree)
      query.set('filter', JSON.stringify(filter))
    } else {
      filter = { isActive: true, 'DonViCha.codeTree': regexText(DonVi.codeTree || '') }
      query.set('filter', JSON.stringify(filter))
    }
    query = '/?' + query
    return query
  }
}

async function getDanhSachPhanCapLinhVuc(req) {
  if (!!req.tokenObj && !!req.tokenObj.roles && req.tokenObj.roles === _configs.super.roles) {
    return req.url
  } else {
    let { account } = req.tokenObj.usr
    let rhApiUrl = _configs.rh.dataUrl + "/tbUsers?filter={account:'" + account + "'}";
    let DonVi = await utils.Axios('get', rhApiUrl)
      .then(function (rhApiRes) {
        return rhApiRes.data._embedded[0].DonVi
      }).catch(function (rhApiErr) {
        return null
      })

    let query = req.url.replace('/?', '');
    query = new URLSearchParams(query)
    let filter = query.get('filter')
    let count = query.get('count')
    if (!count) return req.url
    if (filter) {
      filter = JSON.parse(filter)
      filter['isActive'] = true
      filter['DonViCha.codeTree'] = regexText(DonVi.codeTree)
      // filter['codeTree'] = regexText(DonVi.codeTree)
      query.set('filter', JSON.stringify(filter))
    } else {
      filter = { isActive: true, 'DonViCha.codeTree': regexText(DonVi.codeTree || '') }
      query.set('filter', JSON.stringify(filter))
    }
    query = '/?' + query
    return query
  }
}

async function getDanhSachPhanCapUser(req) {
  if (!!req.tokenObj && !!req.tokenObj.roles && req.tokenObj.roles === _configs.super.roles) {
    return req.url
  } else {
    let { account } = req.tokenObj.usr
    let rhApiUrl = _configs.rh.dataUrl + "/tbUsers?filter={account:'" + account + "'}";
    let DonVi = await utils.Axios('get', rhApiUrl)
      .then(function (rhApiRes) {
        return rhApiRes.data._embedded[0].DonVi
      }).catch(function (rhApiErr) {
        return null
      })

    let query = req.url.replace('/?', '');
    query = new URLSearchParams(query)
    let filter = query.get('filter')
    let count = query.get('count')
    if (!count) return req.url
    if (filter) {
      filter = JSON.parse(filter)
      filter['isActive'] = true
      filter['DonVi.codeTree'] = regexText(DonVi.codeTree)
      // filter['codeTree'] = regexText(DonVi.codeTree)
      query.set('filter', JSON.stringify(filter))
    } else {
      filter = { isActive: true, 'DonVi.codeTree': regexText(DonVi.codeTree || '') }
      query.set('filter', JSON.stringify(filter))
    }
    query = '/?' + query
    return query
  }
}

async function updateMulti(table, filter, data) {
  let rhApiUrl = _configs.rh.dataUrl + "/" + table + "/*?filter=" + JSON.stringify(filter);
  let apiRes = await utils.Axios('patch', rhApiUrl, data)
    .then(function (rhApiRes) {
      return true
    }).catch(function (rhApiErr) {
      return false
    })
  return apiRes
}

async function checkIsExisted(table, key, value) {
  let rhApiUrl = _configs.rh.dataUrl + "/" + table + "?filter={" + key + ":'" + value + "'}";
  let apiRes = await utils.Axios('get', rhApiUrl)
    .then(function (rhApiRes) {
      return rhApiRes.data._embedded[0]
    }).catch(function (rhApiErr) {
      return false
    })
  return !!apiRes
}
export {
  getIsActiveItem, getDanhSachPhanCapDonVi, getDanhSachPhanCapNhomDanhMuc, getDanhSachPhanCapDanhMuc,
  getDanhSachPhanCapLinhVuc, getDanhSachPhanCapUser, checkIsExisted, updateMulti
}