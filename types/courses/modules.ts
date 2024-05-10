export interface Module {
  id: number;
  href: string;
  module: string;
  status: "Not started" | "Finished" | "Ongoing";
  statusText: string;
  description: string;
  environment: "Not started" | "Finished" | "Ongoing";
  submodules: Submodule[];
}

export interface Submodule {
  id: number;
  href: string;
  module: string;
  status: "Not started" | "Finished" | "Ongoing";
  environment: "Not started" | "Finished" | "Ongoing";
  description: string;
}
