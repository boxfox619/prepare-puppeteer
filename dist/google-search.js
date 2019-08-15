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
exports.search = () => __awaiter(this, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.goto('https://google.com'); // 구글 검색창 이동
    yield page.type('input[class="gLFyf gsfi"]', '박스여우'); // 박스여우 검색어 입력
    yield page.type('input[class="gLFyf gsfi"]', String.fromCharCode(13)); // 엔터키를 입력하여 검색 수행
    yield page.waitForSelector('a h3'); // a 태그 밑, h3태그 가 존재하는 컨텐츠가 로드될 때 까지 대기
    yield page.screenshot({ path: 'result.png' });
    const links = yield page.evaluate(() => {
        return Array.from(document.querySelectorAll('a h3')).map(h3 => (h3.textContent)); // h3태그 의 text 가져옴
    });
    console.log(links.join('\n')); //콘솔에 출력
    browser.close();
});
