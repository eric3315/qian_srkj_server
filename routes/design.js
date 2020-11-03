import Router from 'koa-router';
import DesignController from '../controllers/design';

const router = new Router({
    prefix: '/design'
});

router.get('/getResearch',DesignController.getResearch);
router.get('/getStep',DesignController.getStep);
router.get('/getParameters',DesignController.getParameters);
router.get('/getThemes',DesignController.getThemes);
router.get('/getStyles',DesignController.getStyles);
router.get('/getSeries',DesignController.getSeries);
router.get('/getStyleByGender',DesignController.getStyleByGender);
router.get('/getStyleList',DesignController.getStyleList);
router.get('/getPatternType',DesignController.getPatternType);
router.get('/getPatternList',DesignController.getPatternList);
router.get('/getPatternImgUpload',DesignController.getPatternImgUpload);


router.post('/getKxsj',DesignController.getKxsj);
router.post('/geJgxsj',DesignController.geJgxsj);
router.post('/geXjsj',DesignController.geXjsj);
router.post('/saveKxsjDesign',DesignController.saveKxsjDesign);
router.post('/saveJgxsjDesign',DesignController.saveJgxsjDesign);
router.post('/saveXjsjDesign',DesignController.saveXjsjDesign);

router.post('/saveResearch',DesignController.saveResearch);
router.post('/delResearch',DesignController.delResearch);

router.post('/geStepJSON',DesignController.geStepJSON);
router.post('/saveStepJSON',DesignController.saveStepJSON);



export default router;
