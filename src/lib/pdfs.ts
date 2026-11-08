export type PdfItem = {
  slug: string;
  title: string;
  /** public 폴더 기준 경로 */
  file: string;
};

// slug 는 반드시 이 허용 목록으로만 검증합니다. (임의 경로 접근 방지)
export const pdfs: readonly PdfItem[] = [
  { slug: "wait", title: "대기", file: "/HSD_RESUME/wait.pdf" },
  { slug: "groupware", title: "그룹웨어", file: "/HSD_RESUME/groupware.pdf" },
  { slug: "munjin", title: "건강문진", file: "/HSD_RESUME/munjin.pdf" },
  { slug: "ger", title: "노년내과", file: "/HSD_RESUME/ger.pdf" },
  { slug: "nursing", title: "모바일 간호", file: "/HSD_RESUME/nursing.pdf" },
  // file 은 실제 파일명(대소문자 포함)과 정확히 같아야 합니다. (Linux 배포 환경은 대소문자 구분)
  { slug: "cicd", title: "CI/CD", file: "/HSD_RESUME/CICD.pdf" },
];

export function getPdf(slug: string): PdfItem | undefined {
  return pdfs.find((pdf) => pdf.slug === slug);
}
