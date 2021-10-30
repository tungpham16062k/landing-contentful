export default class RouterMgr {

    static instance = null;
    static createInstance() { return new RouterMgr(); }
    static getInstance() {
        if (!RouterMgr.instance) { RouterMgr.instance = RouterMgr.createInstance(); }
        return RouterMgr.instance;
    }

    static footprints = {
        index_1: '', // current page;
        index_2: '', // recent page;
        index_3: '', // previous page;
    };

    setCurrentRouter(page, param) {
        let temp = RouterMgr.footprints;
        RouterMgr.footprints = {
            index_1: page,
            index_1_param: param,
            index_2: temp.index_1,
            index_2_param: temp.index_1_param,
            index_3: temp.index_2,
            index_3_param: temp.index_2_param,
        };
    }

    getCurrentRouter(index, all) {
        if (index) {
            if (all) {
                return {
                    route: RouterMgr.footprints[`index_${index}`],
                    param: RouterMgr.footprints[`index_${index}_param`],
                };
            } else {
                return RouterMgr.footprints[`index_${index}`];
            }
        } else {
            return RouterMgr.footprints;
        }
    }

}