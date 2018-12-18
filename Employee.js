const {MongoClient,ObjectID}=require('mongodb')
//insert method
var addEmployee=(employee,callback)=>{
MongoClient.connect('mongodb://127.0.0.1:27017/Employee',(err,client)=>{
if(err)
{
console.log('cant connect');
}
else{
    const db=client.db('Employee');
    db.collection('EmployeeInfo').insertOne(employee,(err,result)=>{
        if(err)
        {
            client.close()
            callback('error occured')
        }
        else
        {
            client.close()
            callback(undefined,result.ops)
        }
    })
    client.close()
    callback(undefined,'DB')
   }
});
}
//get method
var getEmployee=(employeeId,callback)=>{
    MongoClient.connect('mongodb://127.0.0.1:27017/Employee',(err,client)=>{
    if(err)
    {
    console.log('cant connect');
    }
    else{
        const db=client.db('Employee');
        // db.collection('EmployeeInfo').find({id:employeeId}).count().then((res)=>{ // for count number of record
        db.collection('EmployeeInfo').find({id:employeeId}).toArray().then((res)=>{
          if(res.length>0)
          {
              callback(undefined,JSON.stringify(res,undefined,2))
          }
          else
          {
              callback('No record found!')
          }
        }).catch((err)=>{
            callback(err)
        })
        client.close()
        callback(undefined,'DB')
       }
    });
    }
    //delete method
var deleteEmployee=(employeeId,callback)=>{
    MongoClient.connect('mongodb://127.0.0.1:27017/Employee',(err,client)=>{
    if(err)
    {
    console.log('cant connect');
    }
    else{
        const db=client.db('Employee');  
        //db.collection('EmployeeInfo').deleteMany({id:employeeId}).then((res)=>{
        db.collection('EmployeeInfo').findOneAndDelete({id:employeeId}).then((res)=>{     
        //db.collection('EmployeeInfo').deleteOne({id:employeeId}).then((res)=>{
              callback(undefined,JSON.stringify(res,undefined,2));
        }).catch((err)=>{
            callback(err)
        })
        client.close()
        callback(undefined,'DB')
       }
    });
    }
     //update method
var updateEmployee=(_id,callback)=>{
    MongoClient.connect('mongodb://127.0.0.1:27017/Employee',(err,client)=>{
    if(err)
    {
    console.log('cant connect');
    }
    else{
        const db=client.db('Employee');  
        //db.collection('EmployeeInfo').deleteMany({id:employeeId}).then((res)=>{
        db.collection('EmployeeInfo').findOneAndUpdate(
            {
                _id: new ObjectID(_id)
            },{
                $set:{
                    name:'Vicky'
                },
                $inc:{
                    id:1
                }
            },{
                returnOriginal:false
            }
        ).then((res)=>{     
        //db.collection('EmployeeInfo').deleteOne({id:employeeId}).then((res)=>{
              callback(undefined,JSON.stringify(res,undefined,2));
        }).catch((err)=>{
            callback(err)
        })
        client.close()
        callback(undefined,'DB')
       }
    });
    }
//export section
module.exports={
    addEmployee,getEmployee,deleteEmployee,updateEmployee
}