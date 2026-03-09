# FormeAI Landing

AI 기반 SNS 마케팅 랜딩 페이지입니다.

- 순수 HTML / CSS / JavaScript
- 반응형, 이용약관·개인정보처리방침 포함

## GitHub Pages 설정

1. 저장소 **Settings** → 왼쪽 메뉴 **Pages** 이동
2. **Build and deployment** → **Source**에서 **Deploy from a branch** 선택
3. **Branch**에서 `main` 선택, 폴더는 **/ (root)** 선택
4. **Save** 클릭 후 수 분 내에 사이트가 배포됩니다.
5. 배포된 URL: `https://zi-dev.github.io/formeai-landing/`

## style.css가 보이지 않을 때

저장소에 `style.css`가 없다면 로컬에서 아래 중 하나로 추가할 수 있습니다.

- **옵션 1**: `GITHUB_TOKEN` 환경 변수 설정 후 `node push-style.js` 실행
- **옵션 2**: Git으로 저장소를 클론한 뒤 `style.css`를 추가하고 `git push`