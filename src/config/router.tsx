import * as React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { PathConfig } from "./pathconfig";
import { ToDoHomePage } from '../page/index';
import { TaskPage } from "../page/todo/task";
import { TaskDetailPage } from "../page/todo/taskdetail";
import { TaskCreatePage } from "../page/todo/taskcreate";
import { TaskEditPage } from "../page/todo/taskedit";
import { TaskDeletePage } from "../page/todo/taskdelete";
import { GCPageContainer } from "../components/gc-pagecontainer";

const router = (
    <Router history={hashHistory} >
        <Route path={PathConfig.Home} component={GCPageContainer}>
            <IndexRoute component={ToDoHomePage} />
            <Route path={PathConfig.ToDo} component={TaskPage} ></Route>
            <Route path={PathConfig.ToDoDetail} component={TaskDetailPage} ></Route>
            <Route path={PathConfig.ToDoCreate} component={TaskCreatePage} ></Route>
            <Route path={PathConfig.ToDoEdit} component={TaskEditPage} ></Route>
            <Route path={PathConfig.ToDoDelete} component={TaskDeletePage} ></Route>
        </Route>
    </Router>
);
export default router;
