const fs = require('fs');
const path = require('path');
import uuid from 'uuid/v4';
let DATE_REGEXP = new RegExp("(\\d{4})-(\\d{2})-(\\d{2})([T\\s](\\d{2}):(\\d{2}):(\\d{2})(\\.(\\d{3}))?)?.*");
export async function toDate(dateString){
    if(DATE_REGEXP.test(dateString)){
        var timestamp = dateString.replace(DATE_REGEXP, function($all,$year,$month,$day,$part1,$hour,$minute,$second,$part2,$milliscond){
            var date = new Date($year, $month,$day, $hour||"00", $minute||"00", $second||"00", $milliscond||"00");
            return date.getTime();
        });
        var date = new Date();
        date.setTime(timestamp);
        return date;
    }
    return null;
}

/*
* 获取当前时间向前的任何时间段
* n传递为数字
* */
export async function getBeforeDate(n){
    let arr=[];
    for(let i=0;i<n;i++){
        let d = new Date();
        let year = d.getFullYear();
        let mon=d.getMonth()+1;
        let day=d.getDate();
        let nn = n-i;
        if(day <= nn){
            if(mon>1) {
                mon=mon-1;
            }
            else {
                year = year-1;
                mon = 12;
            }
        }
        d.setDate(d.getDate()-nn+1);
        year = d.getFullYear();
        mon=d.getMonth()+1;
        day=d.getDate();
        let s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
        arr.push(s);
    }
    return arr;
}

export async function getDateArr(n){
  let arr=[];
  for(let i=0;i<n;i++){
    let d = new Date();
    let year = d.getFullYear();
    let mon=d.getMonth()+1;
    let day=d.getDate();
    let nn = n-i;
    if(day <= nn){
      if(mon>1) {
        mon=mon-1;
      }
      else {
        year = year-1;
        mon = 12;
      }
    }
    d.setDate(d.getDate()-nn+1);
    year = d.getFullYear();
    mon=d.getMonth()+1;
    day=d.getDate();
    let s = year+"-"+mon+"-"+day;
    arr.push(s);
  }
  return arr;
}


export async function getUuid(){
    return await uuid();
}

/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path){
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if(err){
                resolve(false);
            }else{
                resolve(stats);
            }
        })
    })
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dir){
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if(err){
                resolve(false);
            }else{
                resolve(true);
            }
        })
    })
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir){
    let isExists = await getStat(dir);
    //如果该路径且不是文件，返回true
    if(isExists && isExists.isDirectory()){
        return true;
    }else if(isExists){     //如果该路径存在但是文件，返回false
        return false;
    }
    //如果该路径不存在
    let tempDir = path.parse(dir).dir;      //拿到上级路径
    //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    let status = await dirExists(tempDir);
    let mkdirStatus;
    if(status){
        mkdirStatus = await mkdir(dir);
    }
    return mkdirStatus;
}
export async function directory_create(newPath){
    await dirExists(newPath);
}


export async function format(date, format){
    let v = "";
    if (typeof date == "string" || typeof date != "object") {
        return;
    }
    let year  = date.getFullYear();
    let month  = date.getMonth()+1;
    let day   = date.getDate();
    let hour  = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let weekDay = date.getDay();
    let ms = date.getMilliseconds();
    let weekDayString = "";

    if (weekDay === 1) {
        weekDayString = "星期一";
    } else if (weekDay === 2) {
        weekDayString = "星期二";
    } else if (weekDay === 3) {
        weekDayString = "星期三";
    } else if (weekDay === 4) {
        weekDayString = "星期四";
    } else if (weekDay === 5) {
        weekDayString = "星期五";
    } else if (weekDay === 6) {
        weekDayString = "星期六";
    } else if (weekDay === 7) {
        weekDayString = "星期日";
    }

    v = format;
    //Year
    v = v.replace(/yyyy/g, year);
    v = v.replace(/YYYY/g, year);
    v = v.replace(/yy/g, (year+"").substring(2,4));
    v = v.replace(/YY/g, (year+"").substring(2,4));

    //Month
    let monthStr = ("0"+month);
    v = v.replace(/MM/g, monthStr.substring(monthStr.length-2));

    //Day
    let dayStr = ("0"+day);
    v = v.replace(/dd/g, dayStr.substring(dayStr.length-2));

    //hour
    let hourStr = ("0"+hour);
    v = v.replace(/HH/g, hourStr.substring(hourStr.length-2));
    v = v.replace(/hh/g, hourStr.substring(hourStr.length-2));

    //minute
    let minuteStr = ("0"+minute);
    v = v.replace(/mm/g, minuteStr.substring(minuteStr.length-2));

    //Millisecond
    v = v.replace(/sss/g, ms);
    v = v.replace(/SSS/g, ms);

    //second
    let secondStr = ("0"+second);
    v = v.replace(/ss/g, secondStr.substring(secondStr.length-2));
    v = v.replace(/SS/g, secondStr.substring(secondStr.length-2));

    //weekDay
    v = v.replace(/E/g, weekDayString);
    return v;
}

export async function elapsedTime(endTime,beginTime){
  let num=(endTime.getTime() - beginTime.getTime())/(1000*60);
  if(num > 60){
    let hour=parseInt(num/60%24);
    let min= parseInt(num % 60);
    let StatusMinute="";
    if (hour>0){StatusMinute += hour + "小时"}
    if (min>0) {StatusMinute += parseFloat(min) + "分钟"}
    return StatusMinute;
  }else {
    let min= parseInt(num % 60);
    let StatusMinute="";
    if (min>0) {StatusMinute += parseFloat(min) + "分钟"}
    return StatusMinute;
  }
}
