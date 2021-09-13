  import React,{Component} from 'react';
  import "bootstrap/dist/css/bootstrap.min.css"
  import reports from'./axios'
import Example from './component/date';



 class Seller extends Component{

        constructor(props){
          super(props);  
          this.state={
           sellerList:[]
          }
        }

componentDidMount(){
      const dataTable={
        "functionName": "listAllStoresOfASeller",
        "sellerId": "",
        "mainCategory" : ""
        }
        console.log("hello", dataTable);
      reports(dataTable).then((data)=>{
        /*if(data.data.success ==='1')*/{
          this.setState({
            sellerList:data.data.result});
      }
    });
}
      

  render(){
    return(
      <div >
      <Example></Example>
         
                 <h1>list of lists</h1>

                 <table className="table table-bordered">
                     <thead>
                     <td>store-Id</td>
                     <td>storeName</td>
                     <td>locality</td>
                     <td>seller_id</td>

                     </thead>
                     <tbody>
                        {
                          this.state.sellerList.map((itm, i) => (
                                <tr>
                                    <td>{itm.storeId}</td>
                                    <td>{itm.storeName}</td>
                                    <td>{itm.locality}</td>
                                    <td>{itm.seller_id}</td>
                                </tr>
                          ))}
                    </tbody>
                 </table>  
          </div>
                          )
          
        }
 }
        
 export default Seller

