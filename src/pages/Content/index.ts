import select from "select-dom";
import getCommitElements from "@pages/Content/getCommitElements";
import createCommitsCollapse from "@pages/Content/createCommitsCollapse";
import removeAlreadyCreatedDetail from "@pages/Content/removeAlreadyCreatedDetail";

const findAllToolbar = (): HTMLElement[] => {
  const toolbars = select.all("markdown-toolbar");
  return toolbars.filter(Boolean);
};

const updateCommits = (htmlElement: HTMLElement): void => {
  removeAlreadyCreatedDetail(htmlElement);
  htmlElement.appendChild(createCommitsCollapse(getCommitElements()));
};

const observeElement = (element: HTMLElement, callback: () => void) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(callback);
  });

  observer.observe(element, {
    childList: true,
  });
};

const getCommitUpdateArea = (): HTMLElement[] => {
  const discussions = select.all("div.js-discussion");
  return discussions.filter(Boolean);
};

function updateAllToolbar(): void {
  const allToolbar = findAllToolbar();
  allToolbar.forEach(updateCommits);
}

function whenCommitUpdated(callback: () => void): void {
  const commitUpdateArea = getCommitUpdateArea();
  commitUpdateArea.forEach((element) => {
    observeElement(element, callback);
  });
}

function init(): void {
  updateAllToolbar();
  whenCommitUpdated(updateAllToolbar);
}

init();
