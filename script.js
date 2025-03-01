document.addEventListener('DOMContentLoaded', () => {  
    const expenseform=document.getElementById("input-container"); 
    const  expensename=document.getElementById("expense-name"); 
    const amt=document.getElementById("amount"); 
    const expenselist=document.getElementById("expense-items"); 
    const totalamt=document.getElementById("totalAmount"); 
     
    let expenses= JSON.parse(localStorage.getItem('expenses'))|| []; 
    let totalamount=calculatetotal();  
    renderexpense();

    expenseform.addEventListener("submit",(e) => { 
         e.preventDefault() 
         const name=expensename.value.trim();
       const amount= parseFloat(amt.value.trim());

       if(name!=="" && !isNaN(amount)&& amount>0){ 
         const newexpense={ 

            id:Date.now(),
            id:Date.now(), 

            name:name, 
            amount:amount

         } 
         expenses.push(newexpense) 
         saveexpenseTolocal()   
         renderexpense()
         updatetotal()

         // clear input 
         expensename.value=""; 
         amt.value="";
       }
    }
    ); 
    function renderexpense() 
    { 
        expenselist.innerHTML="" 
        expenses.forEach(expense => { 
           const li= document.createElement('li'); 
           li.innerHTML=` 
           ${expense.name} -$${expense.amount}  



           <button data-id="${expense.id}">Delete</button> 
           
           `  
           expenselist.appendChild(li);

        })
    }

    function calculatetotal()
    { 
      return expenses.reduce((sum,expense) => sum+expense.amount, 0)
    } 
    function saveexpenseTolocal() 
    { 
        localStorage.setItem('expenses',JSON.stringify(expenses));
    } 
    function updatetotal()
    { 
        totalamount=calculatetotal() 
        totalamt.textContent=totalamount.toFixed(2);
    }
     expenselist.addEventListener('click',(e) => 
    { 
        if(e.target.tagName==='BUTTON'){ 
          const expenseid=  parseInt(e.target.getAttribute('data-id')); 
          expenses=expenses.filter(expense => expense.id !==expenseid);
          saveexpenseTolocal(); 
          renderexpense();
          updatetotal();
        }
    })
})