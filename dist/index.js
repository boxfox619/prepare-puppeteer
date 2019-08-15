"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_search_1 = require("./google-search");
const calendar_1 = require("./calendar");
google_search_1.search()
    .then(res => console.log('finish'))
    .catch(err => console.log(err));
calendar_1.editSchedule()
    .then(res => console.log('finish'))
    .catch(err => console.log(err));
