import React, { PureComponent } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import "bootstrap/dist/css/bootstrap.min.css"
import seller from '../App';    

export class PaginationExample extends PureComponent {

    constructor(props) {
        super(props)
    
        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 10,
            currentPage: 0
        }

        this.handlePageClick = this.handlePageClick.bind(this);

    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
	
    }

   componentDidMount(){
        this.getData();
    }
    getData() {
        axios
            .get()
            .then(res => {
                var tdata = res.data;
                console.log('data-->'+JSON.stringify(tdata))
				 var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(tdata.length / this.state.perPage),
                    orgtableData : tdata,
                    tableData:slice
                })
            });
    }


    render() {
        return (
            <div>
                 <h1>list of lists</h1>
                 <seller/>

                 <table border="1">
                     <thead>
                     <td>store-Id</td>
                     <td>storeName</td>
                     <td>locality</td>
                     <td>seller_id</td>

                     </thead>
                     <tbody>
                        {
                          this.state.tableData.map((t, i) => (
                                <tr>
                                    <td>{t.storeId}</td>
                                    <td>{t.storeName}</td>
                                    <td>{t.locality}</td>
                                    <td>{t.seller_id}</td>
                                </tr>
                            
                          ))
                        }

                     </tbody>
                 </table>   

                 <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
        )
    }
}

export default PaginationExample