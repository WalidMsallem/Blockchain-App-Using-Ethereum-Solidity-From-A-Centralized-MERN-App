class App extends React.Component  {
  constructor(props) {
          super(props)
    this.state = {
    total_amount : 1000
    }
  }
  render () {
    return(
      <div>
           <h1>   Lottery application </h1>
         <div>
          <p>Total lettery amount is  {this.state.total_amount}</p>

               <form>
                <input placeholder="amount" name=""/>
                 <input placeholder="email" name="" />
                 <button> participate </button>
              </form>
       </div>
     </div>
    )
  }
}


ReactDOM.render(
  <App /> , document.getElementById('reactBinding')
)
