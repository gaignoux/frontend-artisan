const questions = (type, path) => {
  const prompts = [];

  if (!type) {
    prompts.push({
      type: 'input',
      name: 'type',
      message: 'What is your type path?',
    });
  }

  if (!path) {
    prompts.push({
      type: 'input',
      name: 'hoc_path',
      message: 'What is your hoc path?',
    });
  }

  prompts.push({
    type: 'input',
    name: 'name',
    message: 'What is your hoc name?',
  });

  return prompts;
};

module.exports = (plop, typePath, hocPath) => {
  const data = { hocPath, typePath };
  const hoc = hocPath ?? '{{> hocPath }}';
  const type = typePath ?? '{{> typePath }}';

  plop.setGenerator('hoc', {
    description: 'Create your react hoc',
    prompts: questions(typePath, hocPath),
    actions: [
      {
        type: 'add',
        path: `${hoc}/{{> hocTypeName }}.ts`,
        templateFile: './templates/hoc.tsx.hbs',
        data,
      },
      {
        type: 'add',
        path: `${type}/{{> hocTypeName }}.type.ts`,
        templateFile: './templates/type.ts.hbs',
        data,
      },
    ],
  });
};
