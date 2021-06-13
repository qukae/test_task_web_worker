export interface DataI {
    id: string;
    int: number;
    float: number;
    color: string;
    child: ChildI;
  }
  export interface ChildI {
    id: string;
    color: string;
  }