import request from 'axios'

//获取所有角色
export function getRoleList () {
    return request({
      url: '/config/allroles',
      method: 'get',
    })
}

export function getRightTree(){
  return request({
    url: '/config/allmenuTree',
    method: 'get'
  })
}

// 添加角色
export function addRole(role, roleZh){
  return request({
    url: '/upms/role/add',
    method: 'post',
    params: {role, roleZh}
  })
}

// 根据id删除角色
export function deleteRole(rid) {
  return request({
    url: '/upms/role/delete',
    methods: 'post',
    params: {rid}
  })
}

export function updateRoleRight(rid, mids){
  return request({
    url: '/upms/role/auth',
    method: 'post',
    params: {rid, mids}
  })
}

export function getRoleRight(rid){
  return request({
    url: '/config/menuIdByRid',
    method: 'post',
    params: {rid}
  })
}

export function getRole () {
  return request({
    url: '/upms/role/',
    method: 'get',
  })
}