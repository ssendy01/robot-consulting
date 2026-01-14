# 로봇 도입 컨설팅 랜딩페이지

## 프로젝트 개요
- **이름**: 로봇 도입 컨설팅 랜딩페이지
- **목적**: 사장님 설득형 전환 랜딩페이지
- **디자인**: Style A (테크/프리미엄/다크 톤)

## 기술 스택
- HTML5
- CSS3 (CSS Variables)
- Vanilla JavaScript
- 반응형 디자인

## 디자인 특징
- 다크 그라데이션 배경 (#0f172a ↔ #1e293b)
- 네온 글로우 효과
- 호버 애니메이션 (카드 떠오르기)
- 반투명 카드 디자인
- 테크/프리미엄 타이포그래피

## 프로젝트 구조
```
/
├─ index.html           # 메인 페이지
├─ inc/
│  ├─ header.html       # 헤더 컴포넌트
│  └─ footer.html       # 푸터 컴포넌트
└─ assets/
   ├─ css/
   │  ├─ common.css     # 공통 스타일 (변수 + 리셋)
   │  └─ index.css      # 페이지별 스타일
   ├─ js/
   │  └─ index.js       # 페이지별 스크립트
   ├─ images/           # 이미지 파일
   └─ fonts/            # 폰트 파일
```

## CSS 구조 규칙
1. **시멘틱 태그 우선**: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
2. **Container 구조**: 시멘틱 태그 → `.container` → `.text-container` + `.content-container`
3. **Section 네이밍**: `.section-{성격}` (예: `.section-hero`, `.section-pain`)
4. **CSS Variables 사용**: `:root` 변수만 사용, 하드코딩 금지

## 섹션 구조 (총 13개)
1. Hero - 문제 선언형
2. Pain Points - 사장님 현실 공감
3. Root Cause - 구조적 문제 인식
4. Solution - 로봇 도입의 합리성
5. Transformation - 도입 후 변화
6. One-Stop - 통합 솔루션 제공
7. Industry - 업종별 맞춤 조합
8. Cost - ROI 계산
9. Process - 도입 프로세스
10. Trust - 신뢰 증명
11. FAQ - 불안 해소
12. CTA - 최종 전환 유도
13. Lead Form - 무료 상담 신청

## 로컬 실행 방법
```bash
# 간단한 HTTP 서버로 실행
python3 -m http.server 3000

# 브라우저에서 접속
# http://localhost:3000
```

## 배포 상태
- **플랫폼**: Cloudflare Pages (예정)
- **상태**: 개발 완료
- **마지막 업데이트**: 2026-01-14

## 개발 원칙
- HTML 구조/카피/클래스명 절대 변경 금지
- CSS만 수정 가능
- 언더바 금지, 하이픈 1개만 사용
- 색상은 CSS Variables만 사용
