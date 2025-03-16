const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  ASK_FLASH: "/flash-ask",
  COLLECTION: "/flash-collection",
  COMMUNITY: "/flash-community",
  TAGS: "/flash-tags",
  JOBS: "/flash-employment",
  KENT: "/kent",
  BLOG: "/blog",

  QUESTION: (id: string) => `/questions/${id}`,
  PROFILE: (id: string) => `/profile/${id}`,

  TAG: (id: string) => `/flash-tags/${id}`,
  SIGN_IN_WITH_OAUTH: `signin-with-oauth`,
};

export default ROUTES;
