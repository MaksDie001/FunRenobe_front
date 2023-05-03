import React from 'react';
import Services from "./services/services";
import "./bootstrap-grid.css"
import "./app.scss"
import Menu from "./companent/menu/menu";
import List from "./companent/list/list";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import One_renobe from "./companent/One_renobe/One_renobe";
import Spiner from "./companent/spiner/spiner";
import ErorMassage from "./companent/ErorMassage/ErorMassage";
import Renobe_add from "./companent/Renobe_add/Renobe_add";
import {findByLabelText} from "@testing-library/react";

const Renobe=new Services()
localStorage.setItem("service",Renobe)
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      data: [],
      loading:true,
      eror:false,
    }
    console.log(localStorage.getItem("user_log"))
  }
  componentDidMount() {
      Renobe.Get_all()
        .then(data => {
          this.setState(() => {
            return {
              data,
              loading:false,
              eror:false,
            };
          });
        }).catch(eror =>{
          this.setState({eror:true})
      })
    if (localStorage.getItem("user_log") === "true"){
      Renobe.LogUser()
      localStorage.setItem("user_log","false")
      console.log("yes")
    }
  }

  render() {
    return(
        <div className="app">
            {this.state.eror ? ErorMassage():
                <div className="row container container_big">
                <Router>
                    <Menu services={Renobe}/>
                    <Routes>
                        <Route path={"renobe/add"} element={<Renobe_add />}/>
                        <Route path={""} element={<List data={this.state.data}/>}/>
                        <Route path={"renobe/:slug"} element={<One_renobe />} />
                    </Routes>
                </Router>
                    {this.state.loading ?<Spiner />:""}
            </div>
            }
        </div>
    )
  }
}

export default App;
