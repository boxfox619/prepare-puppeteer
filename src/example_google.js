'use strict';
const puppeteer = require('puppeteer');
main();

function main() {
  search().then(res => {
    console.log('finish');
  }).catch(err => {
    console.error(err);
  });
}

async function search() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://google.com'); // 구글 검색창 이동
  await page.type('input[class="gLFyf gsfi"]', '박스여우'); // 박스여우 검색어 입력
  await page.type('input[class="gLFyf gsfi"]', String.fromCharCode(13));  // 엔터키를 입력하여 검색 수행
  await page.waitForSelector('a h3'); // a 태그 밑, h3태그 가 존재하는 컨텐츠가 로드될 때 까지 대기
  await page.screenshot({path: 'result.png'});
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a h3')).map(h3 => (h3.textContent)); // h3태그 의 text 가져옴
  });
  console.log(links.join('\n'));  //콘솔에 출력
  browser.close();
}