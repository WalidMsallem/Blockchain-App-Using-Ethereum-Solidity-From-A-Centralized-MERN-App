class App extends React.Component  {
  constructor(props) {
          super(props)
    this.state = {
    total_amount : 0,
    amount : 100,
    email : ''
    }
  }
  async componentDidMount() {
    const result = await axios.get('/get_total_amount')
    this.setState({
      total_amount : result.data[0].total_amount
    })
  }
  onSubmit = async (event ) => {
    event.preventDefault()
    const response = await axios.post('/post_info', {
      amount : this.state.amount ,
      email : this.state.email
    })
     window.location.href = response.data
  }
  render () {
    return(
      <div>
           <h1>   Lottery application </h1>
         <div>
          <p>Total lettery amount is  {this.state.total_amount}</p>

               <form onSubmit = {this.onSubmit}>
                <input placeholder="amount" name="" value = {this.state.amount} onChange = {event => this.setState({amount:event.target.value})}/>
                 <input placeholder="email" name=""   value = {this.state.email}  onChange = {event => this.setState({email:event.target.value})} />
                 <button type = "submit"> participate </button>
              </form>
       </div>
     </div>
    )
  }
}


ReactDOM.render(
  <App /> , document.getElementById('reactBinding')
)
