export type Language = "ru" | "en";

const ru = {
  nav: {
    home: "Главная",
    projects: "Проекты",
    teams: "Команды",
    about: "О проекте",
  },
  back: "Назад",
  backToTop: "Наверх",
  theme: {
    toDark: "Переключить на тёмную тему",
    toLight: "Переключить на светлую тему",
  },
  auth: {
    signIn: "Войти",
    signUp: "Зарегистрироваться",
    signOut: "Выйти",
    profile: "Профиль",
    logoutOk: "Вы вышли из аккаунта",
  },
  login: {
    title: "Вход",
    subtitle: "Войдите, чтобы подавать заявки в команды.",
    email: "Email",
    password: "Пароль",
    emailRequired: "Введите email",
    emailInvalid: "Некорректный формат email",
    passwordRequired: "Введите пароль",
    submit: "Войти",
    noAccount: "Нет аккаунта?",
    signUpLink: "Зарегистрироваться",
    demoOk: "Вы вошли (демо)",
  },
  register: {
    title: "Регистрация",
    subtitle: "Создайте аккаунт, чтобы публиковать проекты и откликаться на роли.",
    name: "Имя",
    email: "Email",
    password: "Пароль",
    confirm: "Подтверждение пароля",
    nameRequired: "Введите имя",
    emailRequired: "Введите email",
    emailInvalid: "Некорректный формат email",
    passwordRequired: "Введите пароль",
    passwordMin: "Пароль должен быть не короче 6 символов",
    confirmRequired: "Повторите пароль",
    confirmMismatch: "Пароли не совпадают",
    submit: "Создать аккаунт",
    hasAccount: "Уже есть аккаунт?",
    loginLink: "Войти",
    demoOk: "Аккаунт создан (демо)",
  },
  profile: {
    title: "Профиль",
    subtitle: "Информация о вашем аккаунте.",
    name: "Имя",
    email: "Email",
    accountTitle: "Аккаунт",
    notLoggedTitle: "Вы не вошли в аккаунт",
    notLoggedSub: "Войдите или зарегистрируйтесь, чтобы просмотреть профиль.",
    goLogin: "Войти",
    goRegister: "Зарегистрироваться",
  },
  home: {
    heroTitle: "DevInfinity — доска проектов и команд",
    heroSubtitle:
      "Публикуйте идеи проектов, собирайте команду по ролям и находите единомышленников по интересующим технологиям. Ищите проекты по тегам и подавайте заявки в команды, которые ищут участников.",
    browseProjects: "Смотреть проекты",
    teamsAndRoles: "Команды и роли",
    heroCardTitle: "Ваш проект уже ищет команду",
    heroCardText:
      "Зарегистрируйтесь, добавьте идею с тегами и укажите, какие роли нужны. Остальные участники найдут вас по интересам.",
    how: "Как это работает",
    step1Title: "Опишите идею",
    step1Desc: "Добавьте проект с тегами и целью.",
    step2Title: "Укажите роли",
    step2Desc: "Отметьте, кого ищете: «Ищем команду».",
    step3Title: "Соберите команду",
    step3Desc: "Получайте заявки и запускайтесь.",
    recent: "Недавние проекты",
    nextTitle: "Куда дальше?",
    nextText:
      "Просмотрите ленту проектов с открытыми ролями или сразу перейдите к командам, которые ищут участников.",
    nextTeamsBtn: "Перейти к командам",
    statProjects: "Проектов",
    statTeams: "Команд",
    statRoles: "Открытых ролей",
    statMembers: "Участников в командах",
  },
  projectsPage: {
    title: "Проекты",
    subtitle:
      "Идеи участников сообщества. Фильтруйте по тегам и ролям и подавайте заявки в команды.",
    search: "Поиск по названию или тегам",
    roleFilter: "Роль, которую вы можете закрыть",
    techFilter: "Технология",
    empty: "По заданным фильтрам проектов не найдено",
    reset: "Сбросить фильтры",
  },
  card: {
    lookingFor: "Ищем:",
    apply: "Подать заявку",
    applied: "Заявка в «{title}» отправлена (демо)",
  },
  status: {
    recruiting: "Ищем команду",
    forming: "Формируемся",
    started: "В работе",
  },
  detail: {
    back: "Все проекты",
    info: "Информация",
    author: "Автор",
    teamSize: "Размер команды",
    posted: "Опубликовано",
    statusField: "Статус",
    roles: "Открытые роли",
    joinTitle: "Хотите присоединиться?",
    notFoundTitle: "Проект не найден",
    notFoundSub: "Возможно, он был изменён или удалён.",
  },
  demo: {
    title: "Демо-режим",
    desc: "Форма заявки появится после интеграции с backend.",
  },
  teamsPage: {
    title: "Команды",
    subtitle:
      "Собранные коллективы, которые ищут участников на открытые роли. Выберите команду и оставьте заявку.",
    project: "Проект",
    openRoles: "Открытые роли:",
    apply: "Подать заявку",
    applied: "Заявка в «{name}» отправлена (демо)",
    lookingForMore: "Ищет ещё:",
    membersTitle: "Участники",
    back: "Все команды",
    notFoundTitle: "Команда не найдена",
    notFoundSub: "Возможно, она была изменена или удалена.",
  },
  about: {
    title: "О проекте",
    subtitle:
      "DevInfinity — площадка, где идеи находят своих людей, а команды — недостающие роли.",
    whyTitle: "Зачем",
    whyText:
      "Проекты часто не доходят до релиза, потому что сложно найти соратников с нужными навыками. DevInfinity решает эту проблему: автор публикует идею с тегами и указывает роли, которые ищет, а участники находят проект по интересам и подают заявку в команду.",
    keyTitle: "Ключевые возможности",
    feature1: "Размещение идей проектов с описанием и целью",
    feature2: "Поиск проектов по тегам и технологиям",
    feature3: "Заявки в команды по открытым ролям",
    feature4: "Статусы «Ищем команду», «Формируемся», «В работе»",
    plansTitle: "Планы развития",
    plansText:
      "Пока сервис работает на демонстрационных данных. В дальнейшем добавится backend на FastAPI, хранение проектов в PostgreSQL, регистрацию пользователей и авторизацию по токенам, а затем свяжется интерфейс с реальным API.",
  },
  notFound: {
    title: "Такой страницы нет.",
    home: "На главную",
  },
  footer: {
    line: "Доска проектов и команд, курс «Fullstack»",
  },
};

type FlattenKeys<T, P extends string = ""> = {
  [K in keyof T]: K extends string
    ? T[K] extends object
      ? FlattenKeys<T[K], `${P}${K}.`>
      : `${P}${K}`
    : never;
}[keyof T];

export type TranslationKey = FlattenKeys<typeof ru>;

const en: typeof ru = {
  nav: {
    home: "Home",
    projects: "Projects",
    teams: "Teams",
    about: "About",
  },
  back: "Back",
  backToTop: "Back to top",
  theme: {
    toDark: "Switch to dark theme",
    toLight: "Switch to light theme",
  },
  auth: {
    signIn: "Sign in",
    signUp: "Sign up",
    signOut: "Sign out",
    profile: "Profile",
    logoutOk: "You have signed out",
  },
  login: {
    title: "Sign in",
    subtitle: "Sign in to apply for teams.",
    email: "Email",
    password: "Password",
    emailRequired: "Email is required",
    emailInvalid: "Invalid email format",
    passwordRequired: "Password is required",
    submit: "Sign in",
    noAccount: "No account?",
    signUpLink: "Sign up",
    demoOk: "You are signed in (demo)",
  },
  register: {
    title: "Sign up",
    subtitle: "Create an account to publish projects and apply for roles.",
    name: "Name",
    email: "Email",
    password: "Password",
    confirm: "Confirm password",
    nameRequired: "Name is required",
    emailRequired: "Email is required",
    emailInvalid: "Invalid email format",
    passwordRequired: "Password is required",
    passwordMin: "Password must be at least 6 characters",
    confirmRequired: "Please repeat the password",
    confirmMismatch: "Passwords do not match",
    submit: "Create account",
    hasAccount: "Already have an account?",
    loginLink: "Sign in",
    demoOk: "Account created (demo)",
  },
  profile: {
    title: "Profile",
    subtitle: "Information about your account.",
    name: "Name",
    email: "Email",
    accountTitle: "Account",
    notLoggedTitle: "You are not signed in",
    notLoggedSub: "Sign in or create an account to view your profile.",
    goLogin: "Sign in",
    goRegister: "Sign up",
  },
  home: {
    heroTitle: "DevInfinity — project & team board",
    heroSubtitle:
      "Post your project ideas, build a team by roles and find like-minded people by technology. Search projects by tags and apply to teams that are looking for members.",
    browseProjects: "Browse projects",
    teamsAndRoles: "Teams & roles",
    heroCardTitle: "Your project is looking for a team",
    heroCardText:
      "Sign up, add your idea with tags and specify which roles you need. Other members will find you by topics.",
    how: "How it works",
    step1Title: "Describe your idea",
    step1Desc: "Add a project with tags and a goal.",
    step2Title: "Define roles",
    step2Desc: "Mark who you are looking for: “Recruiting”.",
    step3Title: "Build your team",
    step3Desc: "Receive applications and launch.",
    recent: "Recent projects",
    nextTitle: "What’s next?",
    nextText:
      "Browse the feed of projects with open roles, or jump straight to the teams that are looking for members.",
    nextTeamsBtn: "Go to teams",
    statProjects: "Projects",
    statTeams: "Teams",
    statRoles: "Open roles",
    statMembers: "Team members",
  },
  projectsPage: {
    title: "Projects",
    subtitle:
      "Ideas from the community. Filter by tags and roles and apply to teams.",
    search: "Search by name or tags",
    roleFilter: "Role you can cover",
    techFilter: "Technology",
    empty: "No projects match the selected filters",
    reset: "Reset filters",
  },
  card: {
    lookingFor: "Looking for:",
    apply: "Apply",
    applied: "Application to “{title}” sent (demo)",
  },
  status: {
    recruiting: "Recruiting",
    forming: "Forming",
    started: "In progress",
  },
  detail: {
    back: "All projects",
    info: "Information",
    author: "Author",
    teamSize: "Team size",
    posted: "Posted at",
    statusField: "Status",
    roles: "Open roles",
    joinTitle: "Want to join?",
    notFoundTitle: "Project not found",
    notFoundSub: "It may have been changed or removed.",
  },
  demo: {
    title: "Demo mode",
    desc: "The application form will appear after backend integration.",
  },
  teamsPage: {
    title: "Teams",
    subtitle:
      "Teams that are looking for members on open roles. Pick a team and leave an application.",
    project: "Project",
    openRoles: "Open roles:",
    apply: "Apply",
    applied: "Application to “{name}” sent (demo)",
    lookingForMore: "Looking for more:",
    membersTitle: "Members",
    back: "All teams",
    notFoundTitle: "Team not found",
    notFoundSub: "It may have been changed or removed.",
  },
  about: {
    title: "About",
    subtitle:
      "DevInfinity is a place where ideas find their people and teams find missing roles.",
    whyTitle: "Why we build this",
    whyText:
      "Student and pet projects often fail because it is hard to find teammates with the right skills. DevInfinity solves this: the author publishes an idea with tags and specifies needed roles, while members find a project by interests and apply to the team.",
    keyTitle: "Key features",
    feature1: "Posting project ideas with a description and goal",
    feature2: "Searching projects by tags and technologies",
    feature3: "Applying for open team roles",
    feature4: "Statuses “Recruiting”, “Forming”, “In progress”",
    plansTitle: "Roadmap",
    plansText:
      "For now the service works with demo data. In the following labs we will add a FastAPI backend, PostgreSQL persistence, user registration and token-based authorization, and then connect the UI to the real API.",
  },
  notFound: {
    title: "This page does not exist.",
    home: "Go home",
  },
  footer: {
    line: "Project & team board — lab work №1, “Fullstack” course",
  },
} as const;

export const translations: Record<Language, typeof ru> = {
  ru,
  en,
};

export type Messages = typeof ru;