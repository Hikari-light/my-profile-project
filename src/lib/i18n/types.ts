export interface DictionaryEntry {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    projects: string;
    contact: string;
  };
  hero: {
    title: string;
    description: string;
    contactButton: string;
    projectsButton: string;
  };
  skills: {
    title: string;
    frontend: {
      title: string;
      description: string;
      nextjs: {
        name: string;
        level: string;
        desc: string;
      };
      typescript: {
        name: string;
        level: string;
        desc: string;
      };
      tailwind: {
        name: string;
        level: string;
        desc: string;
      };
      ui: {
        name: string;
        level: string;
        desc: string;
      };
    };
    backend: {
      title: string;
      description: string;
      nodejs: {
        name: string;
        level: string;
        desc: string;
      };
      database: {
        name: string;
        level: string;
        desc: string;
      };
      rest: {
        name: string;
        level: string;
        desc: string;
      };
      graphql: {
        name: string;
        level: string;
        desc: string;
      };
    };
    devops: {
      title: string;
      description: string;
      mongodb: {
        name: string;
        level: string;
        desc: string;
      };
      postgresql: {
        name: string;
        level: string;
        desc: string;
      };
      docker: {
        name: string;
        level: string;
        desc: string;
      };
      cicd: {
        name: string;
        level: string;
        desc: string;
      };
    };
  };
  cta: {
    title: string;
    description: string;
    contactButton: string;
  };
  techStack: {
    title: string;
    nextjs: {
      name: string;
      desc: string;
    };
    tailwind: {
      name: string;
      desc: string;
    };
    shadcn: {
      name: string;
      desc: string;
    };
    supabase: {
      name: string;
      desc: string;
    };
    description: string;
  };
  projects: {
    title: string;
    description: string;
    viewProject: string;
    techStack: string;
  };
  contact: {
    title: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submitting: string;
    errorMessage: string;
    thankYou: string;
    responsePromise: string;
    sendAnother: string;
    limitExceeded: string;
    errors: {
      nameRequired: string;
      emailRequired: string;
      messageRequired: string;
    };
  };
  footer: {
    techStack: string;
    navigation: string;
    contact: string;
    copyright: string;
    builtWith: string;
  };
}
