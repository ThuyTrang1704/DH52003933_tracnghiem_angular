export class ClassAcount {
    nameClass: string;
    faculty:  number;
  
    constructor(data?: any) {
      this.nameClass = data?.nameClass || '';
      this.faculty = data?.faculty || 2;
    }
  }
  