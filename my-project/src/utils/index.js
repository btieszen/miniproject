export function formateDate(){
    const current = new Date();
  
    const date=`${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
    return date
}