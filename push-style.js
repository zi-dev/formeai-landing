/**
 * style.css를 zi-dev/formeai-landing 저장소에 푸시하는 스크립트
 * 사용법: GITHUB_TOKEN=your_token node push-style.js
 * 또는: set GITHUB_TOKEN=your_token && node push-style.js (Windows)
 */
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'zi-dev';
const REPO = 'formeai-landing';
const BRANCH = 'main';
const FILE_PATH = 'style.css';

if (!TOKEN) {
  console.error('GITHUB_TOKEN 환경 변수를 설정해 주세요.');
  process.exit(1);
}

const stylePath = path.join(__dirname, 'style.css');
if (!fs.existsSync(stylePath)) {
  console.error('style.css 파일을 찾을 수 없습니다.');
  process.exit(1);
}

const content = fs.readFileSync(stylePath, 'utf8');
const body = {
  message: 'Add style.css',
  branch: BRANCH,
  content: Buffer.from(content, 'utf8').toString('base64'),
};

const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

fetch(url, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
})
  .then((res) => res.json())
  .then((data) => {
    if (data.message) {
      console.error('오류:', data.message);
      process.exit(1);
    }
    console.log('style.css 푸시 완료:', data.content.html_url);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
