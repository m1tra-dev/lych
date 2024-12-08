export interface IProducts {
  id:number,         
  parentId:number,    
  image?:string,      
  link?:string,            
  name:string,
  description?:string, 
  price?:string | number | undefined,       
  }