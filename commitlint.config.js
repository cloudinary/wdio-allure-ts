module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']], // override config-conventional: allow upper case Jira ticket id (sentence-case)
    'type-enum': [2, 'always', ['docs', 'feat', 'fix', 'test']],
  },
};
