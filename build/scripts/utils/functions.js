var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchData(urlPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let resposenObject = yield fetch(urlPath, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let data = yield resposenObject.json();
        return data;
    });
}
;
export function getFromStorage(storageName, identifier, idValue) {
    if (localStorage.getItem(storageName)) {
        let tmpData = JSON.parse(localStorage.getItem(storageName));
        for (let i = 0; i < tmpData.length; i++) {
            if (tmpData[i][identifier] == idValue) {
                return tmpData[i];
            }
        }
        return "Data not Found in Storage";
    }
    else {
        return "storage name is Invalid";
    }
}
export function setToStorage(storageName, index, data) {
    if (localStorage.getItem(storageName)) {
        let tmpData = JSON.parse(localStorage.getItem(storageName));
        tmpData[index] = data;
        localStorage.setItem(storageName, JSON.stringify(tmpData));
    }
    else {
        return "storage name is Invalid";
    }
}
