type formattedStatus = {
    success: boolean,
    status: number,
    message?: string,
    data?: object
  }
  
  export function statusFormatter(success: boolean, status: number, message?: string, data?: object){
    let formattedStatus: formattedStatus = {success: success, status: status}
    if(message){
      formattedStatus.message = message
    }
    if(data){
      formattedStatus.data = data
    }
    return formattedStatus
  }