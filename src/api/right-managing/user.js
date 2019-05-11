import request from 'axios'

// 获取所有用户
export function getUserList(){
  return request({
    url: '/upms/user/',
    method: 'get'
  })
}

//添加用户
export function addUser (username,password,rids) {
  return request({
    url: '/upms/user/add',
    method: 'post',
    params:{username,password,rids}
  })
}

//删除用户
export function deleteUser(uid){
  return request({
    url: '/upms/user/delete',
    method: 'post',
    params: {uid}
  })
}

export function updateUser(id, username){
  return request({
    url: '/upms/user/update',
    method: 'post',
    params: {"id":id, "username": username}
  })
}

// 根据用户id 获取用户拥有的权限
export function getUserMenuTree (uid) {
  return request ({
    url: '/upms/user/menuTree',
    method: 'post',
    params: {uid}
  })
}

