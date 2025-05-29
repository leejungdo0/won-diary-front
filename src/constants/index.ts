export type TimeItemType = "study" | "meta" | "practice" | "hyedoo";
export const EXTRA_ITEMS: { name: string; type: TimeItemType; description: string }[] = [
  {
    name: "경전",
    type: "study",
    description:
      "우리의 지정 교서와 참고 경전 등을 이름이니, 이는 공부인으로 하여금 그 공부하는 방향로를 알게 하기 위함이요.",
  },
  {
    name: "법규",
    type: "study",
    description:
      "우리의 지정 교서와 참고 경전 등을 이름이니, 이는 공부인으로 하여금 그 공부하는 방향로를 알게 하기 위함이요.",
  },
  {
    name: "강연",
    type: "study",
    description:
      "우리의 지정 교서와 참고 경전 등을 이름이니, 이는 공부인으로 하여금 그 공부하는 방향로를 알게 하기 위함이요.",
  },
  {
    name: "회화",
    type: "study",
    description:
      "우리의 지정 교서와 참고 경전 등을 이름이니, 이는 공부인으로 하여금 그 공부하는 방향로를 알게 하기 위함이요.",
  },
  {
    name: "의두",
    type: "hyedoo",
    description:
      "우리의 지정 교서와 참고 경전 등을 이름이니, 이는 공부인으로 하여금 그 공부하는 방향로를 알게 하기 위함이요.",
  },
  {
    name: "성리",
    type: "hyedoo",
    description:
      "우리의 지정 교서와 참고 경전 등을 이름이니, 이는 공부인으로 하여금 그 공부하는 방향로를 알게 하기 위함이요.",
  },
  {
    name: "염불",
    type: "practice",
    description:
      "우리의 지정 교서와 참고 경전 등을 이름이니, 이는 공부인으로 하여금 그 공부하는 방향로를 알게 하기 위함이요.",
  },
  {
    name: "좌선",
    type: "practice",
    description:
      "우리의 지정 교서와 참고 경전 등을 이름이니, 이는 공부인으로 하여금 그 공부하는 방향로를 알게 하기 위함이요.",
  },
  {
    name: "기도",
    type: "practice",
    description:
      "우리의 지정 교서와 참고 경전 등을 이름이니, 이는 공부인으로 하여금 그 공부하는 방향로를 알게 하기 위함이요.",
  },
  {
    name: "학습",
    type: "meta",
    description:
      "우리의 지정 교서와 참고 경전 등을 이름이니, 이는 공부인으로 하여금 그 공부하는 방향로를 알게 하기 위함이요.",
  },
  {
    name: "봉공",
    type: "meta",
    description:
      "우리의 지정 교서와 참고 경전 등을 이름이니, 이는 공부인으로 하여금 그 공부하는 방향로를 알게 하기 위함이요.",
  },
  {
    name: "휴식",
    type: "meta",
    description:
      "우리의 지정 교서와 참고 경전 등을 이름이니, 이는 공부인으로 하여금 그 공부하는 방향로를 알게 하기 위함이요.",
  },
  {
    name: "수면",
    type: "meta",
    description:
      "우리의 지정 교서와 참고 경전 등을 이름이니, 이는 공부인으로 하여금 그 공부하는 방향로를 알게 하기 위함이요.",
  },
  {
    name: "허송",
    type: "meta",
    description:
      "우리의 지정 교서와 참고 경전 등을 이름이니, 이는 공부인으로 하여금 그 공부하는 방향로를 알게 하기 위함이요.",
  },
];

export const MAX_TOTAL = 24 * 60; // 1440분
