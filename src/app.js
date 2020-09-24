"use strict";

import Utils from './services/Utils.js'

import Navbar from './views/components/navbar.js'


import Error404 from './views/pages/Error404.js'
import Home from './views/pages/Home.js'

import Interviews from './views/pages/interviews/Interviews.js'
import ShowInterview from './views/pages/interviews/Show.js'
import NewInterview from './views/pages/interviews/New.js'
import UpdateInterview from './views/pages/interviews/Update.js'

import Users from './views/pages/users/Users.js'
import ShowUser from './views/pages/users/Show.js'
import NewUser from './views/pages/users/New.js'
import UpdateUserfrom './views/pages/users/Update.js'


const routes = {
    '/'                     : Home,
    '/interviews'           : Interviews,
    '/interviews/new'       : CreateInterview,
    '/interviews/:id'       : ShowInterview,
    '/interviews/:id/edit'  : UpdateInterview,
    '/users'                : Users,
    '/users/new'            : CreateUser,
    '/users/:id'            : ShowUser,
    '/users/:id/edit'       : UpdateUser
};

const router = async() => {
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');

    header.innerHTML = await Navbar.render();
    await Navbar.after_render();

    let request = Utils.parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb: '')

    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();
}

window.addEventListener('hashchange', router);

window.addEventListener('load', router);