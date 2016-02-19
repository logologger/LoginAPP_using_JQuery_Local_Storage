$(document).ready(function()
                 {
    console.log("Document is ready Now");
   $('#submit_login').click(function()
                         {
       var token=0;
       var loginID=$('#login').val();
       var password=$('#password').val();
       
       console.log(loginID+"  "+password);
       
       $.getJSON('data.json',function(data)
                {
           for(var i=0;i<data.Users.length;i++)
               {
                   if(loginID===data.Users[i].login && password===data.Users[i].password)
                       {
                           token=1;
                           if(data.Users[i].role==="admin")
                               {
                                    window.location.replace("admin.html");
                           
                               }
                           else{
                                    window.location.replace("student.html");
                                }
                       }
               }
           
       });
           //check in localStorage for the values
           
           
           var second_token=0;
           //If the user credentials are not in json file and user is not logging in first time means the localStorage in not empty
           if(token===0 && window.localStorage.getItem("users"))
               {
                   var users_local_storage=JSON.parse(window.localStorage.getItem("users"));
                   for(var p=0;p<users_local_storage.length;p++)
                       {
                           
                           if(users_local_storage[p].login===loginID && users_local_storage[p].password===password)
                               {
                                   second_token=1;
                                   
                                  
                                   
                               }
                           if(second_token===1)
                               {
                                   if(users_local_storage[p].role==="admin")
                                    {
                                        window.location.replace("admin.html");
                                       
                           
                                    }else{
                                        window.location.replace("student.html");
                                        
                                    } 
                                   break;
                               }
                           
                       
                   
                  
                   if(second_token===0)
                        window.location.replace("register.html");

                }
           
        
           
               }
       else{
           window.location.replace("register.html");
           //Here the LocalStorage is empty 
       }
       
       
       
       
   }) ;
    $('#submit_register').on('click',function()
                                
                                
                                {
        
        var data;
        var login_local_id=$('#login_register').val();
        var password_local_id=$('#password_register').val();
        var user_local;
// var data=window.localStorage.getItem("users") ? window.localStorage.getItem("users") || [];
         var json_obj={};
        json_obj.login=login_local_id;
        json_obj.password=password_local_id;
        json_obj.role="admin";
        console.log(json_obj);
        
        if(window.localStorage.getItem("users"))
            {
            data=JSON.parse(window.localStorage.getItem("users")); 
                
           data.push(json_obj);
            }
        else{
                   data=[];
            data.push(json_obj);
            
        }
        
       
        
        
        window.localStorage.setItem("users",JSON.stringify(data));
        window.location.replace("index.html");
      
        
    });
    
    
});