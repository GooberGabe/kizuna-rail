import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';
import { getRoutesByRegion, getRoutesBySeason } from '../../models/model.js';

export default async (req, res) => {
    const { region, season } = req.query;

    const regions = await getListOfRegions();
    const routes = await getAllRoutes();
    const seasons = await getListOfSeasons();

    let routesByRegion = routes;
    if (region) {
        routesByRegion = await getRoutesByRegion(region);
    }
    let routesBySeason = routes;
    if (season) {
        routesBySeason = await getRoutesBySeason(season);
    }

    const set = new Set(routesBySeason);
    const intersection = routesByRegion.filter(route => set.has(route));


    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes: intersection,
        seasons
    });
};