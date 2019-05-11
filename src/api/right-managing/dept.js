import request from 'axios'

//获取部门树
export function getDeptTree(){
  return request({
    url: '/upms/dept/tree',
    method: 'get',
  })
}

//根据部门id获取部门信息
export function getDeptInfo(id){
  return request({
    url: '/upms/dept/'+id,
    method:'get',
  })
}

export function addDept(){
  return request({
    url: '/upms/dept/dept_add',
    method: 'post',
  })
}

export function deleteDept(id){
  return request({
    url: '/upms/dept/dept_delete',
    method: 'post',
    params: {id}
  })
}

export function updateDept(name,parentId){
  return request({
    url: '/upms/dept/dept_update',
    method: 'post',
    params: {
      "name": name,
      "parentId":parentId
    }
  })
}