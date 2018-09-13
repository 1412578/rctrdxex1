const db = {
    tri: {password: "12345", role: ["update", "delete"]},
    irt: {password: "12345", role: ["update"]}
}
export const fakeService = {
    login(username, password){
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                if (db[username] && db[username].password === password)
                    resolve(db[username].role);
                else
                    reject(new Error("Login failed"));
            }, 3000);
        });
    }
}