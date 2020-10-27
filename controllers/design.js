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
    static async getStyles(ctx){
        let {styles=""} = ctx.query;
        let data=[];
        try{
            let jsonPath = path.join(__dirname,'../utils/style_img.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            let stylesArr=styles.split(',');
            for(let i=0;i<stylesArr.length;i++){
                let style = stylesArr[i];
                let arr = jsonArr.filter(item=>{return item.style_type === style});
                if(arr.length>0){
                    data.push(arr[0])
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
    static async getSeries(ctx){
        let {themeName=""} = ctx.query;
        let data=[];
        try{
            let jsonPath = path.join(__dirname,'../utils/series_img.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            for(let i=0;i<jsonArr.length;i++){
                let {theme_name} = jsonArr[i];
                if(theme_name === themeName){
                    data.push(jsonArr[i]);
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
    static async getKxsj(ctx){
        let {themeName="",seriesName="",dressStyle="",silhouette="",craft="",mountings=""} = ctx.query;
        let data=[];
        try{
            let jsonPath = path.join(__dirname,'../utils/jgxsj.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            for(let i=0;i<jsonArr.length;i++){
                let {theme_name,series_name,dress_style} = jsonArr[i];
                if(themeName!=="" &&  seriesName!=="" && dressStyle!=="" && silhouette!=="" && craft!=="" && mountings!==""){
                    if(theme_name === themeName &&
                        series_name === seriesName &&
                        dress_style === dressStyle &&
                        silhouette === jsonArr[i].silhouette  &&
                        craft === jsonArr[i].craft  &&
                        mountings === jsonArr[i].mountings
                    ){
                        data.push(jsonArr[i]);
                    }
                } else if(themeName!=="" &&  seriesName!=="" && dressStyle!=="" && silhouette==="" && craft==="" && mountings===""){
                    if(theme_name === themeName &&
                        series_name === seriesName &&
                        dress_style === dressStyle
                    ){
                        data.push(jsonArr[i]);
                    }
                } else if(themeName!=="" &&  seriesName!=="" && dressStyle!=="" && silhouette!=="" && craft==="" && mountings===""){
                    if(theme_name === themeName &&
                        series_name === seriesName &&
                        dress_style === dressStyle &&
                        silhouette === jsonArr[i].silhouette
                    ){
                        data.push(jsonArr[i]);
                    }
                } else if(themeName!=="" &&  seriesName!=="" && dressStyle!=="" && silhouette!=="" && craft!=="" && mountings===""){
                    if(theme_name === themeName &&
                        series_name === seriesName &&
                        dress_style === dressStyle &&
                        silhouette === jsonArr[i].silhouette  &&
                        craft === jsonArr[i].craft
                    ){
                        data.push(jsonArr[i]);
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
    static async geKxsjDesign(ctx){
        let {themeName="",seriesName="",dressStyle="",silhouette="",craft="",mountings=""} = ctx.query;
        let data=[];
        try{
            let jsonPath = path.join(__dirname,'../utils/kxsj_design.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            if(jsonArr.length>0){
                for(let i=0;i<jsonArr.length;i++){
                    if(themeName!=="" &&  seriesName!=="" && dressStyle!=="" && silhouette!=="" && craft!=="" && mountings!==""){
                        if(themeName === jsonArr[i].themeName &&
                            seriesName === jsonArr[i].seriesName &&
                            dressStyle === jsonArr[i].dressStyle &&
                            silhouette === jsonArr[i].silhouette  &&
                            craft === jsonArr[i].craft  &&
                            mountings === jsonArr[i].mountings
                        ){
                            data.push(jsonArr[i]);
                        }
                    } else if(themeName!=="" &&  seriesName!=="" && dressStyle!=="" && silhouette==="" && craft==="" && mountings===""){
                        if(themeName === jsonArr[i].themeName &&
                            seriesName === jsonArr[i].seriesName &&
                            dressStyle === jsonArr[i].dressStyle
                        ){
                            data.push(jsonArr[i]);
                        }
                    } else if(themeName!=="" &&  seriesName!=="" && dressStyle!=="" && silhouette!=="" && craft==="" && mountings===""){
                        if(themeName === jsonArr[i].themeName &&
                            seriesName === jsonArr[i].seriesName &&
                            dressStyle === jsonArr[i].dressStyle &&
                            silhouette === jsonArr[i].silhouette
                        ){
                            data.push(jsonArr[i]);
                        }
                    } else if(themeName!=="" &&  seriesName!=="" && dressStyle!=="" && silhouette!=="" && craft!=="" && mountings===""){
                        if(themeName === jsonArr[i].themeName &&
                            seriesName === jsonArr[i].seriesName &&
                            dressStyle === jsonArr[i].dressStyle &&
                            silhouette === jsonArr[i].silhouette  &&
                            craft === jsonArr[i].craft
                        ){
                            data.push(jsonArr[i]);
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



    static async saveKxsjDesign(ctx){
        let {themeName="",seriesName="",dressStyle="",silhouette="",craft="",mountings="",yichang=0,jianbu=0,yaotou=0,dibai=0} =ctx.request.body;
        try{
            let jsonPath = path.join(__dirname,'../utils/kxsj_design_common.json');
            let jsonPath1 = path.join(__dirname,'../utils/kxsj_design.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let result1 = fs.readFileSync(jsonPath1, 'utf8');
            let jsonArr = JSON.parse(result);
            let jsonArr1 = JSON.parse(result1);
            if(jsonArr.length > 0){
                for(let i=0;i<jsonArr.length;i++){
                    if(jsonArr[i].theme_name === themeName &&
                        jsonArr[i].series_name === seriesName &&
                        jsonArr[i].dress_style === dressStyle &&
                        jsonArr[i].silhouette === silhouette &&
                        jsonArr[i].craft === craft &&
                        jsonArr[i].mountings === mountings &&
                        jsonArr[i].yichang === yichang &&
                        jsonArr[i].jianbu === jianbu &&
                        jsonArr[i].yaotou === yaotou &&
                        jsonArr[i].dibai === dibai){
                        for(let j=0;j<jsonArr1.length;j++){
                            if(jsonArr1[j].themeName === themeName &&
                                jsonArr1[j].seriesName === seriesName &&
                                jsonArr1[j].dressStyle === dressStyle &&
                                jsonArr1[j].silhouette === silhouette &&
                                jsonArr1[j].craft === craft &&
                                jsonArr1[j].mountings === mountings){
                                jsonArr1[j].yichang = yichang ||0;
                                jsonArr1[j].jianbu = jianbu ||0;
                                jsonArr1[j].yaotou = yaotou ||0;
                                jsonArr1[j].dibai = dibai ||0;
                                jsonArr1[j].img_path = jsonArr[i].img_path||"";
                                break;
                            } else {
                                jsonArr1[j].push({
                                    themeName:themeName||'',
                                    seriesName:seriesName||'',
                                    dressStyle:dressStyle||'',
                                    silhouette:silhouette||'',
                                    craft:craft||'',
                                    mountings:mountings||'',
                                    yichang:yichang||0,
                                    jianbu:jianbu||0,
                                    yaotou:yaotou||0,
                                    dibai:dibai||0,
                                    img_path:jsonArr[i].img_path||'',
                                })
                            }
                        }
                    }
                }
            }
            ctx.body = {
                code: 200,
                msg: '保存成功'
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
                            "step_name": "产品企划",
                            "parameters": []
                        },
                        {
                            "step_key": 2,
                            "step_name": "产品系列",
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
