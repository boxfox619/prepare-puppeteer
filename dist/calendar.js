"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
exports.editSchedule = () => __awaiter(this, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
        console.log(interceptedRequest.url());
        interceptedRequest.continue();
    });
    yield page.goto('https://boxfox619.github.io/Planning-Calendar/', { waitUntil: 'networkidle0' }); // 구글 검색창 이동
    yield deleteAllSchedules(page);
    yield addSchedule(page, 2, 4, '테스트 스케쥴', 20);
    yield addSchedule(page, 3, 6, '테스트 일정', 10);
    const scheduls = yield getSchedules(page);
    console.log(scheduls.join('\n')); //콘솔에 출력
    browser.close();
});
function deleteAllSchedules(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const handles = yield page.$$('.sc-bZQynM');
        for (const handle of handles) {
            yield handle.click();
            yield page.waitFor(1000);
            yield Promise.all([
                page.waitForResponse(res => res.url().includes('/task')),
                page.click('.ant-modal-footer .ant-btn:last-child')
            ]);
        }
    });
}
function addSchedule(page, row, column, name, time) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.click(`.sc-chPdSV:nth-child(${row}) .sc-fjdhpX:nth-child(${column})`);
        yield page.waitFor(500);
        yield page.type('input[name="name"]', name);
        yield page.click('span.ant-form-item-children button');
        yield page.click(`li[role="menuitem"]:nth-child(${time})`);
        yield page.waitFor(1000);
        yield Promise.all([
            page.waitForResponse(res => res.url().includes('/task')),
            page.click('button[type="submit"]')
        ]);
    });
}
function getSchedules(page) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield page.evaluate(() => {
            return Array.from(document.querySelectorAll('.sc-bZQynM')).map(div => (div.textContent)); // h3태그 의 text 가져옴
        });
    });
}
