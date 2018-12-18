const employeeObj=require('./Employee')
const {argv}=require('yargs')
// employeeObj.addEmployee({id:argv.id,name:argv.name},(err,res)=>{
// if(err)
// {
// console.log(err);
// }
// else
// {
// console.log(res)
// }
// })
// employeeObj.deleteEmployee(argv.id,(err,res)=>{
//     if(err){
//         console.log(err)
//     }
//     else
//     {
//         console.log(res)
//     }
// })
employeeObj.updateEmployee(argv._id,(err,res)=>{
    if(err){
        console.log(err)
    }
    else
    {
        console.log(res)
    }
})