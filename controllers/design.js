import {format} from "../utils/util";
const fs = require('fs');
const path = require('path');

class DesignController {

    static async getResearch(ctx){
        let data=[];
        try{
            let jsonPath = path.join(__dirname,'../utils/model_step.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            jsonArr.forEach(item=>{
                let {model_name,create_time,update_time} = item;
                data.push({model_name,create_time,update_time})
            });
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data
            }
        }catch(err){
            console.error(err);
            ctx.body = {
                code: 412,
                msg: `接口调用异常${err.message}`
            }
        }
    }
    static async getStep(ctx){
        let {modelName=""} = ctx.query;
        let data=[];
        try{
            let jsonPath = path.join(__dirname,'../utils/model_step.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            for(let i=0;i<jsonArr.length;i++){
                let {model_name,steps} = jsonArr[i];
                if(modelName === model_name){
                    steps.forEach((cur)=>{
                        let {step_key,step_name} = cur;
                        data.push({model_name,step_key,step_name})
                    });
                    break;
                }
            }
            if(data.length>0){
                data.sort((a,b)=>{
                    return a.step_key - b.step_key
                });
            }
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data
            }
        }catch(err){
            console.error(err);
            ctx.body = {
                code: 412,
                msg: `接口调用异常${err.message}`
            }
        }
    }
    static async getParameters(ctx){
        let {stepKey='',modelName=""} = ctx.query;
        let data=[];
        try{
            let jsonPath = path.join(__dirname,'../utils/model_step.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            for(let i=0;i<jsonArr.length;i++){
                let {model_name,steps} = jsonArr[i];
                if(modelName === model_name){
                    for (let j = 0; j < steps.length; j++) {
                        let {step_key, step_name, parameters} = steps[j];
                        if (parseInt(stepKey) === parseInt(step_key)) {
                            data.push({model_name,step_key,step_name, parameters});
                            break;
                        }
                    }
                }
            }
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data
            }
        }catch(err){
            console.error(err);
            ctx.body = {
                code: 412,
                msg: `接口调用异常${err.message}`
            }
        }
    }
    static async getThemes(ctx){
        let {themeName=""} = ctx.query;
        let data=[];
        try{
            let jsonPath = path.join(__dirname,'../utils/theme.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            for(let i=0;i<jsonArr.length;i++){
                let {theme_name,theme_children} = jsonArr[i];
                if(theme_name === themeName){
                    data = theme_children
                }
            }
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data
            }
        }catch(err){
            console.error(err);
            ctx.body = {
                code: 412,
                msg: `接口调用异常${err.message}`
            }
        }
    }



    static async saveResearch(ctx){
        let {modelName=""} = ctx.request.body;
        try{
            let jsonPath = path.join(__dirname,'../utils/model_step.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            let flag =jsonArr.some(item=>{return item.model_name === modelName});
            if(!flag){
                jsonArr.push({
                    "model_name": modelName,
                    "create_time": await format(new Date(),'yyyy-MM-dd HH:mm:ss'),
                    "update_time": await format(new Date(),'yyyy-MM-dd HH:mm:ss'),
                    "steps": [
                        {
                            "step_key": 1,
                            "step_name": "主题调研",
                            "parameters": []
                        },
                        {
                            "step_key": 2,
                            "step_name": "主题研发",
                            "parameters": []
                        },
                        {
                            "step_key": 3,
                            "step_name": "服装轮廓",
                            "parameters": []
                        },
                        {
                            "step_key": 4,
                            "step_name": "结构线分区",
                            "parameters": []
                        },
                        {
                            "step_key": 5,
                            "step_name": "设计细节",
                            "parameters": []
                        },
                        {
                            "step_key": 6,
                            "step_name": "主题系列展示",
                            "parameters": []
                        }
                    ]
                });
                fs.writeFileSync(jsonPath,JSON.stringify(jsonArr));

            } else {
                for(let i=0; i<jsonArr.length; i++){
                    let {model_name} = jsonArr[i];
                    if(modelName === model_name){
                        jsonArr[i].model_name =modelName;
                        jsonArr[i].update_time =await format(new Date(),'yyyy-MM-dd HH:mm:ss');
                    }
                }
                fs.writeFileSync(jsonPath,JSON.stringify(jsonArr));
            }
            ctx.body = {
                code: 200,
                msg: '保存成功'
            };
        }catch(err){
            console.error(err);
            ctx.body = {
                code: 412,
                msg: `接口调用异常${err.message}`
            }
        }
    }
    static async delResearch(ctx){
        let {modelName=""} = ctx.request.body;
        try{
            let jsonPath = path.join(__dirname,'../utils/model_step.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            for(let i=0; i<jsonArr.length; i++){
                let {model_name} = jsonArr[i];
                if(modelName === model_name){
                    jsonArr[i] = jsonArr[jsonArr.length-1];
                    jsonArr.length--;
                    i--;
                }
            }
            fs.writeFileSync(jsonPath,JSON.stringify(jsonArr));
            ctx.body = {
                code: 200,
                msg: '删除成功'
            };
        }catch(err){
            console.error(err);
            ctx.body = {
                code: 412,
                msg: `接口调用异常${err.message}`
            }
        }
    }

}
export default DesignController;
