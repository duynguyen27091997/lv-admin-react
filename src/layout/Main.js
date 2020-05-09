import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import CreateCourses from "../pages/create/CreateCourses";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import ListCourses from "../pages/ListCourses";
import Setting from "../pages/Setting";
import ManageContents from "../pages/create/ManageContents";
import ListUsers from "../pages/ListUsers";

const Main = () => {
    return (
        <main>
            <Switch>
                <Route path={'/create-courses'} component={CreateCourses}/>
                <Route path={'/manage-contents'} component={ManageContents}/>
                <Route path={'/list-courses'} component={ListCourses}/>
                <Route path={'/list-users'} component={ListUsers}/>
                <Route path={'/setting'} component={Setting}/>
                <Route path={'/'} component={Home}/>
                <Route render={NotFound} />
            </Switch>
        </main>
);
};

export default withRouter(Main);