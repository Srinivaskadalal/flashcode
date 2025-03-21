import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const techDescriptionMap: { [key: string]: string } = {
  // A
  adonisjs:
    "AdonisJS is a full-stack Node.js framework for building robust, server-side web applications with ease.",
  ae: "After Effects (AE) is Adobe’s tool for creating motion graphics and visual effects for video content.",
  aftereffects:
    "After Effects is a powerful Adobe software for designing motion graphics and cinematic visual effects.",
  amazonwebservices:
    "Amazon Web Services (AWS) provides scalable cloud computing services for storage, compute, and more.",
  anaconda:
    "Anaconda is a Python distribution for data science, offering a rich ecosystem of libraries and tools.",
  android:
    "Android is Google’s mobile OS, widely used for developing apps with a vast user base.",
  androidstudio:
    "Android Studio is the official IDE for Android app development, featuring robust tools and emulators.",
  angularjs:
    "AngularJS is a JavaScript framework for building dynamic, single-page web applications with MVC architecture.",
  ansible:
    "Ansible is an automation tool for configuring and managing servers with simple, agentless orchestration.",
  apache:
    "Apache is a widely-used open-source web server known for reliability and flexibility.",
  apachekafka:
    "Apache Kafka is a distributed streaming platform for handling real-time data feeds efficiently.",
  appcelerator:
    "Appcelerator enables cross-platform mobile app development using JavaScript with a single codebase.",
  apple:
    "Apple’s ecosystem supports development for macOS, iOS, and more with tools like Xcode.",
  appwrite:
    "Appwrite is an open-source backend-as-a-service platform for building secure, scalable applications.",
  arduino:
    "Arduino is an open-source platform for building interactive electronics projects with easy-to-use hardware.",
  atom: "Atom is a customizable, open-source text editor designed for developers with Git integration.",
  aws: "AWS offers a broad cloud platform for scalable computing, storage, and deployment solutions.",
  azure:
    "Azure is Microsoft’s cloud platform, providing services for app development, AI, and data storage.",

  // B
  babel:
    "Babel is a JavaScript compiler that transforms modern code into backward-compatible versions for browsers.",
  backbonejs:
    "Backbone.js is a lightweight JavaScript framework for structuring single-page applications with models and views.",
  bamboo:
    "Bamboo is a CI/CD tool by Atlassian for automating builds, tests, and deployments.",
  bash: "Bash is a Unix shell and scripting language for automating tasks and managing systems.",
  behance:
    "Behance is a platform for showcasing creative work, often used by designers and artists.",
  bitbucket:
    "Bitbucket is a Git-based platform for code collaboration, hosting, and CI/CD pipelines.",
  bitnami:
    "Bitnami simplifies app deployment with pre-configured stacks for servers, clouds, and containers.",
  blender:
    "Blender is an open-source 3D creation suite for modeling, animation, and rendering.",
  bootstrap:
    "Bootstrap is a popular CSS framework for building responsive, mobile-first websites quickly.",
  bower:
    "Bower is a package manager for front-end web dependencies like libraries and frameworks.",
  browserstack:
    "BrowserStack is a cloud platform for testing web and mobile apps across devices.",
  bulma:
    "Bulma is a modern CSS framework for creating responsive, Flexbox-based web layouts.",

  // C
  c: "C is a foundational programming language for system programming and low-level development.",
  cakephp:
    "CakePHP is a PHP framework for rapid development of secure, structured web applications.",
  canva:
    "Canva is a graphic design platform for creating visuals like presentations and social media graphics.",
  cassandra:
    "Cassandra is a scalable NoSQL database designed for high availability and big data workloads.",
  centos:
    "CentOS is a stable, open-source Linux distribution derived from Red Hat Enterprise Linux.",
  ceylon:
    "Ceylon is a modern language for writing modular, readable code with strong typing.",
  chartjs:
    "Chart.js is a JavaScript library for creating interactive, customizable charts and data visualizations.",
  chrome:
    "Chrome is Google’s fast, widely-used web browser with strong developer tools support.",
  circleci:
    "CircleCI is a CI/CD platform for automating software builds, tests, and deployments.",
  clojure:
    "Clojure is a functional Lisp dialect for the JVM, emphasizing simplicity and concurrency.",
  clojurescript:
    "ClojureScript compiles Clojure to JavaScript, enabling functional programming for web apps.",
  cmake:
    "CMake is a cross-platform tool for managing the build process of software projects.",
  codecov:
    "Codecov is a code coverage tool that integrates with CI/CD for quality insights.",
  codeigniter:
    "CodeIgniter is a lightweight PHP framework for building fast, simple web applications.",
  codepen:
    "CodePen is an online editor for testing and showcasing HTML, CSS, and JavaScript code.",
  codewars:
    "Codewars is a platform for improving coding skills through challenges and katas.",
  coffeescript:
    "CoffeeScript is a language that compiles to JavaScript, offering cleaner syntax and readability.",
  composer:
    "Composer is a dependency manager for PHP, simplifying library integration in projects.",
  confluence:
    "Confluence is Atlassian’s collaboration tool for documentation and team knowledge sharing.",
  couchdb:
    "CouchDB is a NoSQL database with a focus on ease of use and replication.",
  cpp: "C++ is a high-performance language for system software, games, and complex applications.",
  cplusplus:
    "C++ enhances C with object-oriented features for performance-critical software development.",
  crystal:
    "Crystal is a Ruby-inspired language with static typing and high performance via compilation.",
  csharp:
    "C# is Microsoft’s versatile language for building Windows apps, games, and web services.",
  css3: "CSS3 is the latest CSS standard, enabling advanced styling and animations for web design.",
  cucumber:
    "Cucumber is a tool for behavior-driven development, writing tests in plain language.",

  // D
  d3js: "D3.js is a JavaScript library for creating dynamic, data-driven visualizations in the browser.",
  dart: "Dart is Google’s language for building fast, cross-platform apps, especially with Flutter.",
  debian:
    "Debian is a stable, open-source Linux distribution known for its robustness and community.",
  denojs:
    "Deno is a secure, modern runtime for JavaScript and TypeScript with built-in tools.",
  digitalocean:
    "DigitalOcean provides cloud infrastructure for developers to deploy and scale applications easily.",
  django:
    "Django is a high-level Python framework for rapid, secure web application development.",
  docker:
    "Docker is a container platform that simplifies application deployment and environment management.",
  dotnet:
    ".NET is Microsoft’s framework for building cross-platform, high-performance applications.",
  dropbox:
    "Dropbox is a cloud storage service for file sharing and collaboration across teams.",
  drupal:
    "Drupal is an open-source CMS for building flexible, content-rich websites and applications.",
  dynamodb:
    "DynamoDB is AWS’s NoSQL database for fast, scalable, and serverless data storage.",

  // E
  eclipse:
    "Eclipse is a popular IDE for Java and other languages with extensive plugin support.",
  elasticsearch:
    "Elasticsearch is a search engine for fast, scalable full-text search and analytics.",
  electron:
    "Electron enables cross-platform desktop app development using JavaScript, HTML, and CSS.",
  elixir:
    "Elixir is a functional language for building scalable, fault-tolerant applications on the Erlang VM.",
  ember:
    "Ember.js is a JavaScript framework for ambitious web applications with built-in conventions.",
  express:
    "Express is a minimal Node.js framework for building fast, scalable web APIs.",

  // F
  fedora:
    "Fedora is a cutting-edge Linux distribution sponsored by Red Hat, ideal for developers.",
  figma:
    "Figma is a collaborative design tool for creating UI/UX prototypes and vector graphics.",
  filezilla:
    "FileZilla is a free FTP client for transferring files between local and remote servers.",
  firebase:
    "Firebase is Google’s platform for building mobile and web apps with real-time features.",
  firefox:
    "Firefox is Mozilla’s open-source browser known for privacy and developer-friendly tools.",
  flask:
    "Flask is a lightweight Python framework for building simple, flexible web applications.",
  flutter:
    "Flutter is Google’s UI toolkit for creating natively compiled apps across platforms.",

  // G
  gatsby:
    "Gatsby is a React-based framework for building fast, static, and modern websites.",
  gcc: "GCC is the GNU Compiler Collection for compiling C, C++, and other languages.",
  gimp: "GIMP is an open-source image editor for photo retouching and graphic design.",
  git: "Git is a version control system that tracks changes in source code during development.",
  github:
    "GitHub is a platform for hosting Git repositories, collaboration, and CI/CD workflows.",
  gitlab:
    "GitLab is a web-based DevOps platform with Git hosting and CI/CD tools.",
  go: "Go is a fast, statically-typed language by Google for scalable, concurrent applications.",
  googlecloud:
    "Google Cloud provides cloud computing services for apps, AI, and data analytics.",
  graphql:
    "GraphQL is a query language for APIs, enabling efficient, flexible data retrieval.",
  gulp: "Gulp is a JavaScript task runner for automating workflows like minification and compilation.",

  // H
  hadoop:
    "Hadoop is an open-source framework for distributed storage and processing of big data.",
  handlebars:
    "Handlebars is a templating engine for creating dynamic HTML with JavaScript.",
  haskell:
    "Haskell is a functional programming language known for purity and strong typing.",
  heroku:
    "Heroku is a platform-as-a-service for deploying, managing, and scaling applications easily.",
  html5:
    "HTML5 is the latest standard for structuring content on the web with multimedia support.",

  // I
  illustrator:
    "Illustrator is Adobe’s vector graphics software for creating logos, icons, and illustrations.",
  inkscape:
    "Inkscape is an open-source vector graphics editor for designing scalable artwork.",
  intellij:
    "IntelliJ IDEA is a powerful IDE for Java and other languages with smart features.",

  // J
  jasmine:
    "Jasmine is a JavaScript testing framework for writing behavior-driven unit tests.",
  java: "Java is an object-oriented language for enterprise apps and Android development.",
  javascript:
    "JavaScript powers dynamic, interactive web applications with broad browser support.",
  jenkins:
    "Jenkins is an open-source automation server for CI/CD pipelines and deployment.",
  jest: "Jest is a JavaScript testing framework by Facebook, ideal for React applications.",
  jetbrains:
    "JetBrains develops IDEs like IntelliJ, PyCharm, and WebStorm for productive coding.",
  jira: "Jira is Atlassian’s tool for issue tracking and agile project management.",
  jquery:
    "jQuery is a fast JavaScript library for simplifying DOM manipulation and events.",

  // K
  k3s: "K3s is a lightweight Kubernetes distribution for running containers in resource-constrained environments.",
  kotlin:
    "Kotlin is a modern language for Android and web development, interoperable with Java.",
  kubernetes:
    "Kubernetes is an open-source platform for automating containerized application deployment and scaling.",

  // L
  laravel:
    "Laravel is a PHP framework for elegant, expressive web application development.",
  less: "Less is a CSS preprocessor that extends CSS with variables and nesting.",
  linkedin:
    "LinkedIn is a professional networking platform, often integrated into apps for authentication.",
  linux:
    "Linux is an open-source OS kernel powering servers, desktops, and embedded systems.",

  // M
  materialui:
    "Material-UI is a React component library implementing Google’s Material Design principles.",
  matlab:
    "MATLAB is a numerical computing environment for data analysis, visualization, and engineering.",
  maven:
    "Maven is a build automation tool for Java projects, managing dependencies and builds.",
  mocha:
    "Mocha is a JavaScript test framework for running asynchronous tests with flexibility.",
  mongodb:
    "MongoDB is a NoSQL database for flexible, document-based data storage and retrieval.",
  mysql:
    "MySQL is a reliable relational database widely used for structured data management.",

  // N
  nestjs:
    "NestJS is a Node.js framework for building scalable, server-side applications with TypeScript.",
  nextjs:
    "Next.js is a React framework for server-side rendering and optimized web applications.",
  nginx:
    "Nginx is a high-performance web server and reverse proxy for efficient traffic handling.",
  nodejs:
    "Node.js enables server-side JavaScript for fast, scalable network applications.",
  numpy:
    "NumPy is a Python library for numerical computing with powerful array operations.",
  nuxtjs:
    "Nuxt.js is a Vue.js framework for server-side rendering and static site generation.",

  // O
  openal:
    "OpenAL is a cross-platform API for rendering 3D audio in games and apps.",
  opengl: "OpenGL is an API for rendering 2D and 3D graphics across platforms.",
  oracle:
    "Oracle Database is an enterprise-grade relational database for robust data management.",

  // P
  pandas:
    "Pandas is a Python library for data manipulation and analysis with powerful structures.",
  photoshop:
    "Photoshop is Adobe’s industry-standard tool for photo editing and graphic design.",
  php: "PHP is a server-side scripting language for building dynamic web applications.",
  postgresql:
    "PostgreSQL is an advanced open-source relational database with strong SQL compliance.",
  premierepro:
    "Premiere Pro is Adobe’s professional video editing software for film and media.",
  pug: "Pug is a concise templating engine for Node.js, rendering HTML with minimal syntax.",
  pycharm:
    "PyCharm is JetBrains’ IDE for Python, offering debugging and data science tools.",
  python:
    "Python is a versatile, readable language for data science, automation, and more.",

  // Q
  qt: "Qt is a C++ framework for building cross-platform applications with rich GUIs.",

  // R
  rails:
    "Ruby on Rails is a Ruby framework for rapid, convention-driven web development.",
  raspberrypi:
    "Raspberry Pi is a small, affordable computer for learning programming and DIY projects.",
  react:
    "React is a library for building fast, modular user interfaces with components.",
  redis:
    "Redis is an in-memory data store for caching, messaging, and real-time applications.",
  redux:
    "Redux is a predictable state management library for JavaScript apps, often with React.",
  rlang:
    "R is a language for statistical computing and graphics, popular in data science.",
  ruby: "Ruby is a dynamic, readable language focused on simplicity and developer happiness.",
  rust: "Rust is a systems language for safe, concurrent, and high-performance applications.",

  // S
  sass: "Sass is a CSS preprocessor enhancing stylesheets with variables, nesting, and mixins.",
  scala:
    "Scala blends object-oriented and functional programming for scalable JVM applications.",
  sequelize: "Sequelize is a Node.js ORM for managing SQL databases with ease.",
  sketch:
    "Sketch is a design tool for creating UI/UX prototypes and vector graphics.",
  slack:
    "Slack is a collaboration platform for team communication, often integrated into workflows.",
  socketio:
    "Socket.IO enables real-time, bidirectional communication between web clients and servers.",
  spring:
    "Spring is a Java framework for building robust, enterprise-grade applications.",
  svelte:
    "Svelte is a JavaScript framework that compiles to vanilla JS for performant UIs.",
  swift: "Swift is Apple’s modern language for iOS and macOS app development.",

  // T
  tailwind:
    "Tailwind CSS is a utility-first framework for rapidly building custom web designs.",
  tailwindcss:
    "Tailwind CSS simplifies web styling with utility classes for responsive designs.",
  tensorflow:
    "TensorFlow is an open-source framework for machine learning and neural networks.",
  threejs:
    "Three.js is a JavaScript library for creating 3D graphics in the browser.",
  tomcat:
    "Tomcat is an open-source Java servlet container for running web applications.",
  travisci:
    "Travis CI is a CI/CD service for automating testing and deployment workflows.",
  trello:
    "Trello is a project management tool using boards and cards for task tracking.",
  typescript:
    "TypeScript adds static typing to JavaScript for scalable, maintainable code.",

  // U
  ubuntu:
    "Ubuntu is a user-friendly Linux distribution for desktops, servers, and cloud environments.",
  unity:
    "Unity is a game development engine for creating 2D and 3D interactive experiences.",

  // V
  vagrant:
    "Vagrant simplifies virtual machine management for consistent development environments.",
  vim: "Vim is a highly configurable, efficient text editor favored by developers.",
  visualstudio:
    "Visual Studio is Microsoft’s IDE for developing apps across platforms and languages.",
  vscode:
    "Visual Studio Code is a lightweight, extensible editor for coding and debugging.",
  vuejs:
    "Vue.js is a progressive JavaScript framework for building interactive user interfaces.",

  // W
  webflow:
    "Webflow is a visual tool for designing and launching responsive websites without coding.",
  webpack:
    "Webpack is a module bundler for JavaScript, optimizing assets for web applications.",
  wordpress:
    "WordPress is an open-source CMS for building blogs, websites, and online stores.",

  // X
  xamarin:
    "Xamarin is a .NET framework for building cross-platform mobile apps with C#.",
  xd: "Adobe XD is a design tool for creating UI/UX prototypes and wireframes.",

  // Y
  yarn: "Yarn is a fast, reliable package manager for JavaScript, enhancing dependency management.",
  yii: "Yii is a high-performance PHP framework for developing scalable web applications.",

  // Z
  zend: "Zend is a PHP framework for building secure, enterprise-level web applications.",
  zsh: "Zsh is an enhanced Unix shell with powerful scripting and customization features.",

  // KENT

  kent: "Kent State University is a public research institution in Kent, Ohio, known for academic excellence.",
  flash:
    "The Golden Flash is the mascot of Kent State University, symbolizing spirit and energy.",
  kentstate:
    "Kent State University offers diverse programs and research opportunities in Ohio since 1910.",
  ksu: "KSU, or Kent State University, is a leading public university with a vibrant campus community.",
  goldenflashes:
    "Golden Flashes is the athletic team name for Kent State University, inspiring pride.",
  goldenflash:
    "The Golden Flash represents Kent State University’s mascot, a dynamic lightning bolt figure.",
  kentohio:
    "Kent, Ohio, is home to Kent State University, a hub of education and innovation.",
  ksugolden:
    "KSU Golden refers to Kent State University’s spirited community and Golden Flashes legacy.",
  flashkent:
    "Flash Kent ties the Golden Flash mascot to Kent State University’s identity.",
  kentst:
    "Kent St. is a shorthand for Kent State University, a prominent Ohio institution.",
  ks: "KS is a brief abbreviation for Kent State University, recognized for its academic impact.",

  // parta
  parta:
    "Portage Area Regional Transportation Authority (PARTA) provides public transportation services in Portage County, Ohio, including fixed-route buses and demand-response services",
};

export const getTechDescription = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();
  return techDescriptionMap[normalizedTechName]
    ? techDescriptionMap[normalizedTechName]
    : `${techName} is a technology or tool widely used in web development, providing valuable features and capabilities.`;
};

export const getDeviconClassName = (techName: string): string => {
  if (!techName) return "devicon-devicon-plain"; // Handle empty input

  // Step 1: Normalize input
  const normalizedTechName = techName
    .replace(/[.\-_]/g, "") // Remove dots, hyphens, and underscores
    .replace(/\s+/g, "") // Remove spaces
    .toLowerCase()
    .trim();

  // Step 2: Check for Kent-related names
  const kentNames = [
    "kent",
    "flash",
    "kentstate",
    "ksu",
    "goldenflashes",
    "goldenflash",
    "kentohio",
    "ksugolden",
    "flashkent",
    "kentst",
    "ks",
  ];
  if (kentNames.some((name) => normalizedTechName.includes(name))) {
    return "IMAGE:/kent.svg";
  }

  const other = ["parts"];
  if (other.some((name) => normalizedTechName.includes(name))) {
    return "IMAGE:/parta.jpeg";
  }
  if (techMap[normalizedTechName]) {
    // Step 3: Direct match
    return `${techMap[normalizedTechName]} colored`;
  }

  // Step 4: Common aliases and abbreviations
  const aliasMap: { [key: string]: string } = {
    // Existing aliases (kept as-is)
    js: "javascript",
    ts: "typescript",
    reactjs: "react",
    vue: "vuejs",
    tailwind: "tailwindcss",
    next: "nextjs",
    node: "nodejs",
    deno: "denojs",
    postgres: "postgresql",
    aws: "amazonwebservices",
    gcp: "googlecloud",
    azuredevops: "azure",

    // New aliases for existing entries
    ecma: "javascript", // ECMAScript, formal name for JS
    es: "javascript", // Short for ECMAScript
    jsx: "react", // React’s JSX syntax
    vue3: "vuejs", // Vue 3 version reference
    nuxt: "nuxtjs", // Short for Nuxt.js
    pg: "postgresql", // Common PostgreSQL shorthand
    psql: "postgresql", // Alternative PostgreSQL shorthand
    amazon: "amazonwebservices", // Broader AWS reference
    goog: "googlecloud", // Informal Google Cloud shorthand
    gcloud: "googlecloud", // Common Google Cloud abbreviation
    az: "azure", // Short for Azure

    // New aliases for other techMap entries
    adonis: "adonisjs", // Short for AdonisJS
    ae: "aftereffects", // Alias already in techMap, mapped here
    ai: "illustrator", // Adobe Illustrator shorthand
    an: "anaconda", // Short for Anaconda
    ng: "angularjs", // Common Angular shorthand
    ans: "ansible", // Short for Ansible
    ap: "apache", // Short for Apache
    kafka: "apachekafka", // Common shorthand for Apache Kafka
    ard: "arduino", // Short for Arduino
    bb: "bitbucket", // Bitbucket shorthand
    bs: "bootstrap", // Bootstrap shorthand
    cplus: "cplusplus", // Alternative for C++
    cpp: "cplusplus", // Common C++ shorthand (already in techMap)
    cs: "csharp", // C# shorthand
    css: "css3", // Short for CSS3
    d3: "d3js", // Short for D3.js
    dj: "django", // Short for Django
    dot: "dotnet", // Short for .NET
    el: "elixir", // Short for Elixir
    exp: "express", // Short for Express
    fb: "firebase", // Firebase shorthand
    fl: "flutter", // Short for Flutter
    gh: "github", // GitHub shorthand
    gl: "gitlab", // GitLab shorthand
    golang: "go", // Common alias for Go
    gql: "graphql", // GraphQL shorthand
    hb: "handlebars", // Handlebars shorthand
    hs: "haskell", // Short for Haskell
    html: "html5", // Short for HTML5
    idea: "intellij", // IntelliJ IDEA shorthand
    jq: "jquery", // jQuery shorthand
    k8s: "kubernetes", // Kubernetes shorthand
    kt: "kotlin", // Short for Kotlin
    lar: "laravel", // Short for Laravel
    mdb: "mongodb", // MongoDB shorthand
    ms: "mysql", // MySQL shorthand
    mui: "materialui", // Material-UI shorthand
    nest: "nestjs", // Short for NestJS
    nx: "nextjs", // Alternative Next.js shorthand
    py: "python", // Python shorthand
    rb: "ruby", // Ruby shorthand
    ror: "rails", // Ruby on Rails shorthand
    rs: "rust", // Short for Rust
    scss: "sass", // SCSS (Sass variant)
    sql: "mysql", // General SQL, mapped to MySQL (could also use PostgreSQL)
    tf: "tensorflow", // TensorFlow shorthand
    three: "threejs", // Short for Three.js
    vb: "visualstudio", // Visual Studio shorthand
    vs: "vscode", // VS Code shorthand
    wp: "wordpress", // WordPress shorthand
  };

  if (aliasMap[normalizedTechName]) {
    return techMap[aliasMap[normalizedTechName]]
      ? `${techMap[aliasMap[normalizedTechName]]} colored`
      : "devicon-devicon-plain";
  }

  // Step 5: Multi-word input handling
  const words = techName.toLowerCase().split(/\s+/); // Split by spaces
  for (let word of words) {
    if (techMap[word]) return `${techMap[word]} colored`;
    if (aliasMap[word] && techMap[aliasMap[word]])
      return `${techMap[aliasMap[word]]} colored`;
  }

  // Step 6: Fuzzy matching (Partial match in techMap keys)
  for (const key in techMap) {
    if (key.includes(normalizedTechName) || normalizedTechName.includes(key)) {
      return `${techMap[key]} colored`;
    }
  }

  // Step 7: Default icon
  return "devicon-devicon-plain";
};

export const getTimeStamp = function (createdAt: Date) {
  const date = new Date(createdAt);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};

export const formatNumber = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
};
