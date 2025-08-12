export function randomIDGenerator(prefix:string,size:number){
const generateId = `${prefix}${Math.floor(Math.pow(10,size-1) + Math.random() * 9 * Math.pow(10,size-1))}`;
return generateId
}