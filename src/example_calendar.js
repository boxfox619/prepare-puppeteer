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
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    console.log(interceptedRequest.url());
    interceptedRequest.continue();
  });

  await page.goto('https://boxfox619.github.io/Planning-Calendar/', { waitUntil: 'networkidle0' }); // 구글 검색창 이동
  await deleteAllSchedules(page);
  await addSchedule(page, 2, 4, '테스트 스케쥴', 20);
  await addSchedule(page, 3, 6, '테스트 일정', 10);
  const scheduls = await getSchedules(page);
  console.log(scheduls.join('\n'));  //콘솔에 출력
  browser.close();
}

async function deleteAllSchedules(page) {
  const handles = await page.$$('.sc-bZQynM');
  for (const handle of handles) {
    await handle.click();
    await page.waitFor(1000);
    await Promise.all([
      page.waitForResponse(res => res.url().includes('/task')),
      page.click('.ant-modal-footer .ant-btn:last-child')
    ])
  }
}

async function addSchedule(page, row, column, name, time) {
  await page.click(`.sc-chPdSV:nth-child(${row}) .sc-fjdhpX:nth-child(${column})`);
  await page.waitFor(500);
  await page.type('input[name="name"]', name);
  await page.click('span.ant-form-item-children button');
  await page.click(`li[role="menuitem"]:nth-child(${time})`);
  await page.waitFor(1000);
  await Promise.all([
    page.waitForResponse(res => res.url().includes('/task')),
    page.click('button[type="submit"]')
  ])
}

async function getSchedules(page) {
  return await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.sc-bZQynM')).map(div => (div.textContent)); // h3태그 의 text 가져옴
  });
}