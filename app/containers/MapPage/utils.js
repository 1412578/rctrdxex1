
export const getCurrentPos = ()=>{
  return new Promise((resolve, reject) =>{
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}