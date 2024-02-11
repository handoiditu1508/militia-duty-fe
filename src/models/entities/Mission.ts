import Task from "./Task";

export enum MissionStatus {
  Active,
  Disabled,
}

type Mission = {
  id: number;
  name: string;
  status: MissionStatus;
  tasks: Task[];
}

export default Mission;
