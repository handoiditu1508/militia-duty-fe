export enum MilitiaStatus {
  Active,
  Disabled,
}

type Militia = {
  id: number;
  name: string;
  dutyDateScore: number;
  assignmentScore: number;
  status: MilitiaStatus;
}

export default Militia;
