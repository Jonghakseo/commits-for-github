import select from "select-dom";
import getCommitElements from "@pages/Content/getCommitElements";
import createCommitsCollapse from "@pages/Content/createCommitsCollapse";
import removeAlreadyCreatedDetail from "@pages/Content/removeAlreadyCreatedDetail";

const findToolbar = (htmlElement: HTMLElement): HTMLElement | null => {
  const toolbar = select("markdown-toolbar", htmlElement);
  if (!toolbar) {
    return null;
  }
  return toolbar;
};

const updateCommits = (htmlElement: HTMLElement) => {
  removeAlreadyCreatedDetail(htmlElement);
  htmlElement.appendChild(createCommitsCollapse(getCommitElements()));
};

const findToolbarAndUpdateCommits = (htmlElement: HTMLElement) => {
  const toolbar = findToolbar(htmlElement);
  if (!toolbar) {
    return;
  }
  updateCommits(toolbar);
};

const observeElement = (element: HTMLElement, callback: () => void) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(callback);
  });

  observer.observe(element, {
    childList: true,
  });
};

const initDiscussion = (htmlElement: HTMLElement) => {
  findToolbarAndUpdateCommits(htmlElement);

  observeElement(htmlElement, () => {
    findToolbarAndUpdateCommits(htmlElement);
  });
};

const getDiscussions = (): HTMLElement[] => {
  const discussions = select.all("div.js-discussion");
  return discussions.filter(Boolean);
};

function initDiscussions() {
  const discussions = getDiscussions();
  discussions.forEach(initDiscussion);
}

const getBottomCommentBox = (): HTMLElement | null => {
  const bottomCommentBox = select("#issue-comment-box");
  if (!bottomCommentBox) {
    return null;
  }
  return bottomCommentBox;
};

function initBottomCommentBox() {
  const bottomCommentBox = getBottomCommentBox();
  if (!bottomCommentBox) {
    return;
  }
  findToolbarAndUpdateCommits(bottomCommentBox);
  observeElement(bottomCommentBox, () => {
    findToolbarAndUpdateCommits(bottomCommentBox);
  });
}

function init() {
  initBottomCommentBox();
  initDiscussions();
}

init();
