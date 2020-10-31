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
        let {paramArr=[]} = ctx.request.body;
        let data=[];
        try{
            let jsonPath = path.join(__dirname,'../utils/kxsj.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            if(paramArr.length>0){
                for(let i=0;i<paramArr.length;i++){
                    let {themeName,seriesName,dressStyleArr,silhouetteArr,craftArr, mountingsArr} =paramArr[i];
                    if(dressStyleArr.length>0 && silhouetteArr.length>0 && craftArr.length>0 && mountingsArr.length>0){
                        for(let d=0;d<dressStyleArr.length;d++){
                            for(let s=0;s<silhouetteArr.length;s++){
                                for(let c=0;c<craftArr.length;c++){
                                    for(let m=0;m<mountingsArr.length;m++){
                                        for(let k=0;k<jsonArr.length;k++){
                                            let {theme_name,series_name,dress_style,silhouette,craft,mountings} = jsonArr[k];
                                            if(theme_name === themeName &&
                                                series_name === seriesName &&
                                                dress_style === dressStyleArr[d] &&
                                                silhouette === silhouetteArr[s]  &&
                                                craft === craftArr[c] &&
                                                mountings === mountingsArr[m]){
                                                data.push(jsonArr[k]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else if(dressStyleArr.length>0 && silhouetteArr.length<=0 && craftArr.length<=0 && mountingsArr.length<=0){
                        for(let d=0;d<dressStyleArr.length;d++){
                            for(let k=0;k<jsonArr.length;k++){
                                let {theme_name,series_name,dress_style} = jsonArr[k];
                                if(theme_name === themeName &&
                                    series_name === seriesName &&
                                    dress_style === dressStyleArr[d]){
                                    data.push(jsonArr[k]);
                                }
                            }
                        }
                    } else if(dressStyleArr.length>0 && silhouetteArr.length>0 && craftArr.length<=0 && mountingsArr.length<=0){
                        for(let d=0;d<dressStyleArr.length;d++){
                            for(let s=0;s<silhouetteArr.length;s++){
                                for(let k=0;k<jsonArr.length;k++){
                                    let {theme_name,series_name,dress_style,silhouette} = jsonArr[k];
                                    if(theme_name === themeName &&
                                        series_name === seriesName &&
                                        dress_style === dressStyleArr[d] &&
                                        silhouette === silhouetteArr[s]){
                                        data.push(jsonArr[k]);
                                    }
                                }
                            }
                        }
                    } else if(dressStyleArr.length>0 && silhouetteArr.length>0 && craftArr.length>0 && mountingsArr.length<=0){
                        for(let d=0;d<dressStyleArr.length;d++){
                            for(let s=0;s<silhouetteArr.length;s++){
                                for(let c=0;c<craftArr.length;c++){
                                    for(let k=0;k<jsonArr.length;k++){
                                        let {theme_name,series_name,dress_style,silhouette,craft} = jsonArr[k];
                                        if(theme_name === themeName &&
                                            series_name === seriesName &&
                                            dress_style === dressStyleArr[d] &&
                                            silhouette === silhouetteArr[s]  &&
                                            craft === craftArr[c]){
                                            data.push(jsonArr[k]);
                                        }
                                    }
                                }
                            }
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
    static async geJgxsj(ctx){
        let data=[];
        try{
            let jsonPath = path.join(__dirname,'../utils/jgxsj.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            for(let i=0;i<jsonArr.length;i++){
                data.push(jsonArr[i])
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
    static async geXjsj(ctx){
        let data=[];
        try{
            let jsonPath = path.join(__dirname,'../utils/xjsj.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            for(let i=0;i<jsonArr.length;i++){
                data.push(jsonArr[i])
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
        let {paramJson=[]} =ctx.request.body;
        let data=[];
        try{
            let jsonPath = path.join(__dirname,'../utils/kxsj_design_common.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            if(jsonArr.length > 0){
                if(paramJson.length>0){
                    for(let i=0;i<paramJson.length;i++){
                        let {theme_name,series_name,dress_style,silhouette,craft,mountings,style,name,yichang,jianbu,yaotou,dibai} = paramJson[i];
                        let arr=jsonArr.filter(item=>{
                            return item.theme_name === theme_name &&
                                item.series_name === series_name &&
                                item.dress_style === dress_style &&
                                item.silhouette === silhouette &&
                                item.craft === craft &&
                                item.mountings === mountings &&
                                item.style === style &&
                                item.yichang === yichang &&
                                item.jianbu === jianbu &&
                                item.yaotou === yaotou &&
                                item.dibai === dibai
                        });
                        console.info(JSON.stringify(arr));
                        if(arr.length>0){
                            data.push({
                                theme_name,series_name,dress_style,silhouette,craft,mountings,style,name,yichang,jianbu,yaotou,dibai,img_path:arr[0].img_path
                            })
                        }
                    }
                }
            }
            fs.writeFileSync(path.join(__dirname,'../utils/jgxsj.json'),JSON.stringify(data));
            ctx.body = {
                code: 200,
                msg: '保存成功',
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
    static async saveJgxsjDesign(ctx){
        let {paramJson=[]} =ctx.request.body;
        let data=[];
        try{
            let jsonPath = path.join(__dirname,'../utils/jgxsj_design_common.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            if(jsonArr.length > 0){
                if(paramJson.length>0){
                    for(let i=0;i<paramJson.length;i++){
                        let {theme_name,series_name,dress_style,silhouette,craft,mountings,style,name,yichang,jianbu,yaotou,dibai,kaijin,lingzi,koudai,koudai_len} = paramJson[i];
                        console.info(JSON.stringify(paramJson[i]));
                        console.info(JSON.stringify(jsonArr))
                        let arr=jsonArr.filter(item=>{
                            return item.theme_name === theme_name &&
                                item.series_name === series_name &&
                                item.dress_style === dress_style &&
                                item.silhouette === silhouette &&
                                item.craft === craft &&
                                item.mountings === mountings &&
                                item.style === style &&
                                item.yichang === yichang &&
                                item.jianbu === jianbu &&
                                item.yaotou === yaotou &&
                                item.kaijin === kaijin &&
                                item.lingzi === lingzi &&
                                item.koudai === koudai &&
                                item.koudai_len === koudai_len
                        });
                        console.info(JSON.stringify(arr));
                        if(arr.length>0){
                            data.push({
                                theme_name,series_name,dress_style,silhouette,craft,mountings,style,name,yichang,jianbu,yaotou,dibai,kaijin,lingzi,koudai,koudai_len,img_path:arr[0].img_path
                            })
                        }
                    }
                }
            }
            fs.writeFileSync(path.join(__dirname,'../utils/xjsj.json'),JSON.stringify(data));
            ctx.body = {
                code: 200,
                msg: '保存成功',
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
    static async saveXjsjDesign(ctx){
        let {paramJson=[]} =ctx.request.body;
        let data=[];
        try{
            let jsonPath = path.join(__dirname,'../utils/xjsj_design_common.json');
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            if(jsonArr.length > 0){
                if(paramJson.length>0){
                    for(let i=0;i<paramJson.length;i++){
                        let {theme_name,series_name,dress_style,silhouette,craft,mountings,style,name,yichang,jianbu,yaotou,dibai,kaijin,lingzi,koudai,koudai_len,zhezhou,niukou,lalian} = paramJson[i];
                        let arr=jsonArr.filter(item=>{
                            return item.theme_name === theme_name &&
                                item.series_name === series_name &&
                                item.dress_style === dress_style &&
                                item.silhouette === silhouette &&
                                item.craft === craft &&
                                item.mountings === mountings &&
                                item.style === style &&
                                item.yichang === yichang &&
                                item.jianbu === jianbu &&
                                item.yaotou === yaotou &&
                                item.kaijin === kaijin &&
                                item.lingzi === lingzi &&
                                item.koudai === koudai &&
                                item.koudai_len === koudai_len &&
                                item.zhezhou === zhezhou &&
                                item.niukou === niukou &&
                                item.lalian === lalian
                        });
                        console.info(JSON.stringify(arr));
                        if(arr.length>0){
                            data.push({
                                theme_name,series_name,dress_style,silhouette,craft,mountings,style,name,yichang,jianbu,yaotou,dibai,kaijin,lingzi,koudai,koudai_len,zhezhou,niukou,lalian,img_path:arr[0].img_path
                            })
                        }
                    }
                }
            }
            fs.writeFileSync(path.join(__dirname,'../utils/ztxlzs.json'),JSON.stringify(data));
            ctx.body = {
                code: 200,
                msg: '保存成功',
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

    static async geStepJSON(ctx){
        let {step="",modelName=""} =ctx.request.body;
        try{
            let jsonPath = path.join(__dirname,`../utils/${modelName}_${step}.json`);
            if(fs.existsSync(jsonPath)){
                let result = fs.readFileSync(jsonPath, 'utf8');
                let jsonArr = JSON.parse(result);
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data:jsonArr
                }
            } else {
                ctx.body = {
                    code: 200,
                    msg: '查询失败'
                }
            }
        }catch(err){
            console.error(err);
            ctx.body = {
                code: 412,
                msg: `接口调用异常${err.message}`
            }
        }
    }
    static async saveStepJSON(ctx){
        let {step="",modelName="",paramJson=[]} =ctx.request.body;
        try{
            fs.writeFileSync(path.join(__dirname,`../utils/${modelName}_${step}.json`),JSON.stringify(paramJson));
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


}
export default DesignController;
