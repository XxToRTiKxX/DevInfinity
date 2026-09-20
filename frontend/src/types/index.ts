export type ProjectStatus = "recruiting" | "forming" | "started";

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  author: string;
  teamSize: number;
  openRoles: string[];
  postedAt: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  projectTitle: string;
  members: number;
  memberNames: string[];
  openRoles: string[];
  tags: string[];
}