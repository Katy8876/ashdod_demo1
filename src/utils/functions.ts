export async function fetchData(urlPath: string): Promise<unknown> {
    let resposenObject = await fetch(urlPath, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data: unknown = await resposenObject.json();
    return data;
};

export function getFromStorage(storageName:string,identifier:string,idValue:string):unknown  {

    if(localStorage.getItem(storageName)){
        let tmpData=JSON.parse(localStorage.getItem(storageName));

        for (let i:number=0;i<(tmpData as Array<any>).length;i++){
            if((tmpData as Array<any>)[i][identifier]==idValue){
                return (tmpData as Array<any>)[i];
            }

        }
        return "Data not Found in Storage"

    }
    else{
        return "storage name is Invalid";
    }

}


export function setToStorage(storageName:string, index:number, data:any):(void|string) 
 {
    if(localStorage.getItem(storageName)){
        let tmpData=JSON.parse(localStorage.getItem(storageName));
        tmpData[index]=data;
        localStorage.setItem(storageName,JSON.stringify(tmpData));
    }
    else{
        return "storage name is Invalid";
    }
}