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


router.post('/saveResearch',DesignController.saveResearch);
router.post('/delResearch',DesignController.delResearch);

export default router;
