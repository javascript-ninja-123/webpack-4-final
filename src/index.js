import React, { Component } from 'react';
import './style/index.less';
import './registerServiceWorker';


const lips = (color = 'red') => {
  return (target) => {
    target.lips = color;
  }
}

const readonly = (target,key,descriptor) => {
  descriptor.writable = false;
  return descriptor
}

const time = (target,key,descriptor) => {
  const origFn = descriptor.value.bind(target);
  let i = 0;
  descriptor.value = (...args) => {
    let id = i ++;
    console.time(key + id);
    let value = origFn(...args);
    console.timeEnd(key + id);
    return value;
  }
}

const utilBelt = (target,key,descriptor) => {
  const orignalFn = descriptor.value.bind(target);
  descriptor.value = (...args) => {
    console.log('man start')
    let value = orignalFn(...args);
    console.log('man end')
    return value;
  }
  target.util = {
    count(num){
      let result = 0;
      for(let i=0; i<= num; i++){
        result += i;
      }
      return result;
    }
  }
}


@lips('blue')
class Girl{
  constructor(color,age = 5){
    this.color = color;
    this.age = age;
  }
  @readonly
  getColor(){
    return this.color;
  }
  @readonly
  getAge(){
    return this.age
  }
  @time
  mapHack(){
    const a = []
    for(let i = 0; i< 100; i++){
      a.push(i)
    }
    return a
  }
  @utilBelt
  yes(){
    const result = this.util.count(5)
    return result
  }
}

const girl = new Girl('red')

console.log(girl.getColor())


console.log(girl.getAge())
console.log(Girl.lips)
console.log(girl.mapHack())
console.log(girl.yes())



const timeCheck = (target,key,descriptor) => {
  const orignFn = descriptor.value.bind(target)

  descriptor.value = (...args) => {
    console.time(key)
    let value = orignFn(...args)
    console.timeEnd(key)
    return value;
  }
  return descriptor
}


const util = (target,key,descriptor) => {
  target.util = {
    count(array){
      return array.reduce((acc,val) => acc + val,0)
    }
  }
}

const memorize = (target,key,descriptor) => {
  const originalFN = descriptor.value.bind(target);
  const hashMap = {};
  descriptor.value = (...args) => {
    const key = JSON.stringify(args);
    if(hashMap[key]){
      console.log('from cache');
      return hashMap[key]
    }
    else{
      hashMap[key] = originalFN(...args)
      return   hashMap[key]
    }
  }

}


class Exp{
  constructor(color){
    this.color = color;
  }
  @timeCheck
  @util
  mapHack(){
    const a = []
    for(let i = 0; i< 100; i++){
      a.push(i)
    }
    const count = this.util.count(a)
    return count
  }
  @memorize
  doThat(num1,num2,num3){
    return num1 + num2 + num3
  }
}

const y = new Exp('red')
console.log(y.mapHack())

console.log(y.doThat(1,2,3))

console.log(y.doThat(1,2,5))

console.log(y.doThat(1,2,5))


const USER = {permission: ["read", 'write']}

const can = (permission) => {
  return (target,key,descriptor) => {
    const originFn = descriptor.value.bind(target)

    descriptor.value = (...args) => {
      if(!USER.permission.includes(permission)){
        return console.error('wrong')
      }
      return originFn(...args)
    }

    return descriptor
  }
}

class Database{
  state = [];
  @can('write')
  add(name){
    this.state.push(name);
    return name;
  }
  @can('read')
  get(name){
    return this.state.filter(value => value === name);
  }
  @can('delete')
  remove(name){
    this.state = this.state.filter(value => value !== name);
    return this.state;
  }
}


const users = new Database();

users.add('sung')

console.log(users.get('sung'))

users.remove('sung')







