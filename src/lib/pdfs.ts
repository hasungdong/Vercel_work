export type PdfItem = {
  slug: string;
  title: string;
  /** public 폴더 기준 경로 */
  file: string;
};

// slug 는 반드시 이 허용 목록으로만 검증합니다. (임의 경로 접근 방지)
export const pdfs: readonly PdfItem[] = [
  { slug: "ger", title: "GER", file: "/HSD_RESUME/ger.pdf" },
  { slug: "groupware", title: "Groupware", file: "/HSD_RESUME/groupware.pdf" },
  { slug: "munjin", title: "Munjin", file: "/HSD_RESUME/munjin.pdf" },
  { slug: "wait", title: "Wait", file: "/HSD_RESUME/wait.pdf" },
  // file 은 실제 파일명(대소문자 포함)과 정확히 같아야 합니다. (Linux 배포 환경은 대소문자 구분)
  { slug: "cicd", title: "CI/CD", file: "/HSD_RESUME/CICD.pdf" },
  { slug: "nursing", title: "Nursing", file: "/HSD_RESUME/nursing.pdf" },
];

export function getPdf(slug: string): PdfItem | undefined {
  return pdfs.find((pdf) => pdf.slug === slug);
}
