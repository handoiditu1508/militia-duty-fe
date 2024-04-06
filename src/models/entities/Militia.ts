export enum MilitiaStatus {
  Active,
  Disabled,
}

type Militia = {
  id: number;
  name: string;
  fullName: string | null;
  phoneNumber: string | null;
  dutyDateScore: number;
  assignmentScore: number;
  status: MilitiaStatus;
}

export default Militia;
