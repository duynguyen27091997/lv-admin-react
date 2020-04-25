import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import CreateCourses from "../pages/create/CreateCourses";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import ListCourses from "../pages/ListCourses";
import Setting from "../pages/Setting";
import ManageContents from "../pages/create/ManageContents";

const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path={'/create-courses'} component={CreateCourses}/>
                <Route exact path={'/manage-contents'} component={ManageContents}/>
                <Route exact path={'/list-courses'} component={ListCourses}/>
                <Route exact path={'/setting'} component={Setting}/>
                <Route exact path={'/'} component={Home}/>
                <Route render={NotFound} />
            </Switch>
        </main>
);
};

export default withRouter(Main);