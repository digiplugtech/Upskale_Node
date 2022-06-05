
const randomCode = () => {
    return Math.floor(1000 + Math.random() * 9000)
}

const generateUniqueCode = () =>{
    return Math.random().toString(36).slice(2)
}

module.exports = {
    randomCode,
    generateUniqueCode
}