import select from "select-dom";
import getCommitElements from "@pages/Content/getCommitElements";
import createCommitsCollapse from "@pages/Content/createCommitsCollapse";
import removeAlreadyCreatedDetail from "@pages/Content/removeAlreadyCreatedDetail";

const findToolbar =
  (htmlElement: HTMLElement) => (callback: (toolbar: HTMLElement) => void) => {
    const toolbar = select("markdown-toolbar", htmlElement);
    if (!toolbar) {
      return;
    }
    callback(toolbar);
  };

const updateCommits = (htmlElement: HTMLElement) => {
  removeAlreadyCreatedDetail(htmlElement);
  htmlElement.appendChild(createCommitsCollapse(getCommitElements()));
};

const findToolbarAndUpdateCommits = (htmlElement: HTMLElement) =>
  findToolbar(htmlElement)(updateCommits);

const observeElement = (element: HTMLElement, callback: () => void) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(callback);
  });

  observer.observe(element, {
    childList: true,
  });
};

const detect = (targetElement: HTMLElement) => {
  findToolbarAndUpdateCommits(targetElement);

  observeElement(targetElement, () => {
    findToolbarAndUpdateCommits(targetElement);
  });
};

function initBottomCommentBox() {
  const bottomCommentBox = select("#issue-comment-box");
  if (!bottomCommentBox) {
    return;
  }
  findToolbarAndUpdateCommits(bottomCommentBox);
}

function init() {
  initBottomCommentBox();

  const detectTargets = select.all("div.js-discussion");
  detectTargets.map((target) => {
    if (!target) {
      return;
    }
    detect(target);
  });
}

init();
