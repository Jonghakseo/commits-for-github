import { DETAIL_CLASS_NAME } from "@pages/Content/constansts";

function removeElementFrom(targetElements: HTMLCollectionOf<Element>) {
  for (const targetElement of targetElements) {
    targetElement.remove();
  }
}
export default function removeAlreadyCreatedDetail(
  targetElement?: HTMLElement
) {
  const details = targetElement?.getElementsByClassName(DETAIL_CLASS_NAME);
  if (!details) {
    return;
  }

  removeElementFrom(details);
}
