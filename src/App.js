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
import User_profile from "./companent/user_profile/user_profile";
import Renobe_chapter_add from "./companent/Renobe_chapter_add/Renobe_chapter_add";
import User_profile_bookmarks from "./companent/user_profile/user_profile_bookmarks";
import User_profile_comments from "./companent/user_profile/user_profile_comments";
import User_profile_info from "./companent/user_profile/user_profile_info";



const Renobe=new Services()
localStorage.setItem("service",Renobe)
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      data: [],
      count:0,
      loading:true,
      eror:false,
      user_id:0
    }
  }


  componentDidMount() {
      Renobe.Get_all()
        .then(data => {
          this.setState({data:data.results})
          this.setState({count:data.count})
          this.setState(() => {
            return {
              loading:false,
              eror:false,
              renobe_id:0
            };
          });
        }).catch(eror =>{
          this.setState({eror:true})

      })
    Renobe.GetResource("user_show")
        .then(data=>this.setState({user_id:data.user_id}))
    if (localStorage.getItem("user_log") === "true"){
      Renobe.LogUser()
      localStorage.setItem("user_log","false")
    }
  }
  updateData = (value) => {
    this.setState({ renobe_id: value })
  }
  render() {
    return(
        <div className="app">
            {this.state.eror ? ErorMassage():
                <div className="row container container_big">
                <Router>
                    <Menu services={Renobe} user_id={this.state.user_id}/>
                    <Routes>
                        <Route path={""} element={<List data={this.state.data} count={this.state.count} next={this.state.next} preview={this.state.preview}/>}/>
                        <Route path={"renobe/:slug"} element={<One_renobe />} />
                        <Route path={"renobe/add"} element={<Renobe_add />}/>
                        <Route path={"user/:id"} element={<User_profile user_id={this.state.user_id} />}/>
                        <Route path={"user/:id/beookmarks"} element={<User_profile user_id={this.state.user_id}  />}/>
                        <Route path={"user/:id/comments"} element={<User_profile user_id={this.state.user_id} />}/>
                        <Route path={"user/:id/chapter_add/:id"} element={<Renobe_chapter_add />}/>
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
