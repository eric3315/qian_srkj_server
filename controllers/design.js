import {format} from "../utils/util";
import send from 'koa-send';


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
                                                silhouette === silhouetteArr[s]){
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
                                            silhouette === silhouetteArr[s]
                                            ){
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
                        let {theme_name,series_name,dress_style,silhouette,craft,mountings,style,name,yishen_changdu,yishen_songliang,xiushen_changdu,xiushen_songliang,jianxing_kuandu,yaobu_yaogao,yaobu_songliang} = paramJson[i];
                        let arr=jsonArr.filter(item=>{
                            return item.theme_name === theme_name &&
                                item.series_name === series_name &&
                                item.dress_style === dress_style &&
                                item.silhouette === silhouette &&
                                item.yishen_changdu === yishen_changdu &&
                                item.yishen_songliang === yishen_songliang &&
                                item.xiushen_changdu === xiushen_changdu &&
                                item.xiushen_songliang === xiushen_songliang &&
                                item.jianxing_kuandu === jianxing_kuandu &&
                                item.yaobu_yaogao === yaobu_yaogao &&
                                item.yaobu_songliang === yaobu_songliang
                        });
                        console.info(JSON.stringify(arr));
                        if(arr.length>0){
                            data.push({
                                theme_name,series_name,dress_style,silhouette,craft,mountings,style,name,yishen_changdu,yishen_songliang,xiushen_changdu,xiushen_songliang,jianxing_kuandu,yaobu_yaogao,yaobu_songliang,img_path:arr[0].img_path
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
                        let {theme_name,series_name,dress_style,silhouette,craft,mountings,style,name,yishen_changdu,yishen_songliang,xiushen_changdu,xiushen_songliang,jianxing_kuandu,yaobu_yaogao,yaobu_songliang,lingxing,jianxing,xiuxing,menjin,koudai} = paramJson[i];
                        console.info(JSON.stringify(paramJson[i]));
                        console.info(JSON.stringify(jsonArr))
                        let arr=jsonArr.filter(item=>{
                            return item.theme_name === theme_name &&
                                item.series_name === series_name &&
                                item.dress_style === dress_style &&
                                item.silhouette === silhouette &&
                                item.yishen_changdu === yishen_changdu &&
                                item.yishen_songliang === yishen_songliang &&
                                item.xiushen_changdu === xiushen_changdu &&
                                item.xiushen_songliang === xiushen_songliang &&
                                item.jianxing_kuandu === jianxing_kuandu &&
                                item.yaobu_yaogao === yaobu_yaogao &&
                                item.yaobu_songliang === yaobu_songliang &&
                                item.lingxing ===lingxing  &&
                                item.jianxing ===jianxing  &&
                                item.xiuxing === xiuxing &&
                                item.menjin ===menjin  &&
                                item.koudai === koudai

                        });
                        console.info(JSON.stringify(arr));
                        if(arr.length>0){
                            data.push({
                                theme_name,series_name,dress_style,silhouette,craft,mountings,style,name,yishen_changdu,yishen_songliang,xiushen_changdu,xiushen_songliang,jianxing_kuandu,yaobu_yaogao,yaobu_songliang,lingxing,jianxing,xiuxing,menjin,koudai,img_path:arr[0].img_path
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
                        let {theme_name,series_name,dress_style,silhouette,craft,mountings,style,name,yishen_changdu,yishen_songliang,xiushen_changdu,xiushen_songliang,jianxing_kuandu,yaobu_yaogao,yaobu_songliang,lingxing,jianxing,xiuxing,menjin,koudai,zhezhou,niukou,lalian} = paramJson[i];
                        let arr=jsonArr.filter(item=>{
                            return item.theme_name === theme_name &&
                                item.series_name === series_name &&
                                item.dress_style === dress_style &&
                                item.silhouette === silhouette &&
                                item.yishen_changdu === yishen_changdu &&
                                item.yishen_songliang === yishen_songliang &&
                                item.xiushen_changdu === xiushen_changdu &&
                                item.xiushen_songliang === xiushen_songliang &&
                                item.jianxing_kuandu === jianxing_kuandu &&
                                item.yaobu_yaogao === yaobu_yaogao &&
                                item.yaobu_songliang === yaobu_songliang &&
                                item.lingxing ===lingxing  &&
                                item.jianxing ===jianxing  &&
                                item.xiuxing === xiuxing &&
                                item.menjin ===menjin  &&
                                item.koudai === koudai &&
                                item.zhezhou === zhezhou &&
                                item.niukou === niukou &&
                                item.lalian === lalian
                        });
                        console.info(JSON.stringify(arr));
                        if(arr.length>0){
                            data.push({
                                theme_name,series_name,dress_style,silhouette,craft,mountings,style,name,yishen_changdu,yishen_songliang,xiushen_changdu,xiushen_songliang,jianxing_kuandu,yaobu_yaogao,yaobu_songliang,lingxing,jianxing,xiuxing,menjin,koudai,zhezhou,niukou,lalian,img_path:arr[0].img_path
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
                            "step_name": "企划调研分析",
                            "parameters": []
                        },
                        {
                            "step_key": 2,
                            "step_name": "产品系列开发",
                            "parameters": []
                        },
                        {
                            "step_key": 3,
                            "step_name": "设计导入-轮廓",
                            "parameters": []
                        },
                        {
                            "step_key": 4,
                            "step_name": "结构设计-部件",
                            "parameters": []
                        },
                        {
                            "step_key": 5,
                            "step_name": "细节设计-装饰",
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


    static async getStyleByGender(ctx){
        let {gender=""} = ctx.query;
        let data=[];
        try{
            let jsonPath = path.join(__dirname,`../utils/${gender}_template.json`);
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            for(let i=0;i<jsonArr.length;i++){
               let {gender:gender1,options} = jsonArr[i];
               if(gender1 === gender){
                   for(let j=0;j<options.length;j++){
                       let {label} =options[j];
                       data.push(label);
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
    static async getStyleList(ctx){
        let {gender="",style=""} = ctx.query;
        let data=[];
        try{
            let jsonPath = path.join(__dirname,`../utils/${gender}_template.json`);
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            for(let i=0;i<jsonArr.length;i++){
                let {gender:gender1,options} = jsonArr[i];
                if(gender1 === gender){
                    for(let j=0;j<options.length;j++){
                        let {label,list} =options[j];
                        if(label === style){
                            list.forEach(item=>{
                               let {sourceImg,bgImg,fImg,wbgImg} =item;
                                data.push({
                                    gender,
                                    style,
                                    sourceImg,bgImg,fImg,wbgImg
                                });
                            });
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

    static async getPatternType(ctx){
        let data=[];
        try{
            let jsonPath = path.join(__dirname,`../utils/pattern.json`);
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            for(let i=0;i<jsonArr.length;i++){
                let {pattern} = jsonArr[i];
                data.push(pattern);
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
    static async getPatternList(ctx){
        let {patternType=""} = ctx.query;
        let data=[];
        try{
            let jsonPath = path.join(__dirname,`../utils/pattern.json`);
            let result = fs.readFileSync(jsonPath, 'utf8');
            let jsonArr = JSON.parse(result);
            for(let i=0;i<jsonArr.length;i++){
                let {pattern,list} = jsonArr[i];
                if(pattern === patternType){
                    data = list;
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

    static async getPatternImgUpload(ctx){
        let {img=""} = ctx.query;
        try{
            if(img!==''){
                const path = `/data/crawler/pachong/images/sxxl_integration/${img}`;
                ctx.attachment(path);
                await send(ctx, path,{root:'/'});
            }
        }catch (err) {
            console.error(err);
            ctx.body = {
                code: 412,
                msg: `接口调用异常${err.message}`
            }
        }
    }

    static async imgBase64(ctx){
        let {imgJson=""} =ctx.request.body;
        console.info(JSON.stringify(imgJson));
        try{
            if(typeof imgJson ==='string'){
                let sourceIndex = imgJson.lastIndexOf("\/"),
                    sourceImgName = imgJson.substr(sourceIndex + 1, imgJson.length);
                let sourceImageData = fs.readFileSync(`/data/crawler/pachong/images/sxxl_integration/${sourceImgName}`, 'utf8');
                let sourceImageBase64 = sourceImageData.toString("base64");
                imgJson = `data:image/bmp;base64,${sourceImageBase64}`;
            } else {
                for(let i=0;i<imgJson.length;i++){
                    let {sourceImg,bgImg,fImg,wbgImg} = imgJson[i];
                    let sourceIndex = sourceImg.lastIndexOf("\/"),
                        sourceImgName = sourceImg.substr(sourceIndex + 1, sourceImg.length);
                    console.info(`/data/crawler/pachong/images/sxxl_integration/${sourceImgName}`);
                    let sourceImageData = fs.readFileSync(`/data/crawler/pachong/images/sxxl_integration/${sourceImgName}`, 'utf8');
                    let sourceImageBase64 = sourceImageData.toString("base64");
                    imgJson[i].sourceImg =`data:image/bmp;base64,${sourceImageBase64}`;

                    let bgIndex = bgImg.lastIndexOf("\/"),
                        bgImgName = bgImg.substr(bgIndex + 1, bgImg.length);
                    let bgImageData = fs.readFileSync(`/data/crawler/pachong/images/sxxl_integration/${bgImgName}`, 'utf8');
                    let bgImageBase64 = bgImageData.toString("base64");
                    imgJson[i].bgImg = `data:image/bmp;base64,${bgImageBase64}`;

                    let fIndex = fImg.lastIndexOf("\/"),
                        fImgName = fImg.substr(fIndex + 1, fImg.length);
                    let fImageData = fs.readFileSync(`/data/crawler/pachong/images/sxxl_integration/${fImgName}`, 'utf8');
                    let fImageBase64 = fImageData.toString("base64");
                    imgJson[i].fImg = `data:image/bmp;base64,${fImageBase64}`;

                    let wbgIndex = wbgImg.lastIndexOf("\/"),
                        wbgImgName = wbgImg.substr(wbgIndex + 1, wbgImg.length);
                    let wbgImageData = fs.readFileSync(`/data/crawler/pachong/images/sxxl_integration/${wbgImgName}`, 'utf8');
                    let wbgImageBase64 = wbgImageData.toString("base64");
                    imgJson[i].wbgImg = `data:image/bmp;base64,${wbgImageBase64}`;
                }
            }
            ctx.body = {
                code: 200,
                data:imgJson
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
