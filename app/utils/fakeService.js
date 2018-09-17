import imgplaceholder from 'images/placeholder.png';
const db = {
    tri: {password: "12345", role: ["update", "delete"]},
    irt: {password: "12345", role: ["update"]}
}
const dbdiagram = {
    count: 7,
    data: [ 
        {id: 1, title: "lorem1", description: "Lorem ipsum dolor sit amet.", img: imgplaceholder},
        {id: 2, title: "lorem2", description: "Lorem ipsum dolor sit amet.", img: imgplaceholder},
        {id: 3, title: "lorem3", description: "Lorem ipsum dolor sit amet.", img: imgplaceholder},
        {id: 4, title: "lorem4", description: "Lorem ipsum dolor sit amet.", img: imgplaceholder},
        {id: 5, title: "lorem5", description: "Lorem ipsum dolor sit amet.", img: imgplaceholder},
        {id: 6, title: "lorem6", description: "Lorem ipsum dolor sit amet.", img: imgplaceholder},
        {id: 7, title: "lorem7", description: "Lorem ipsum dolor sit amet.", img: imgplaceholder},
    ]
}
export const fakeService = {
    login: (username, password) => {
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                if (db[username] && db[username].password === password)
                    resolve(db[username].role);
                else
                    reject(new Error("Login failed"));
            }, 3000);
        });
    },
    createDiagram: (id, description) => {
       return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                dbdiagram.data.push({id: dbdiagram.data.count + 1, title, description, img});
                resolve(); 
            }, 1000);
       });
    },
    loadDiagram: (id) => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                const index = dbdiagram.findIndex(d => d.id === id);
                if (index !== -1)
                    resolve(dbdiagram.data[index]);
                else 
                    reject("Cannot load diagram");
            }, 1000);
        })
    },
    listDiagram: () => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(dbdiagram.data);
            }, 1000);
        });
    }
}