import React from "react";
import Services from "../../services/services";

const Renobe=new Services()
class Country extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            country:[],
        }
    }
    componentDidMount() {
        Renobe.Get_renobe(`country/${this.props.country_id}`)
            .then(country => {
                this.setState(() => {
                    return {
                        country,
                    };
                });
            });
        console.log(this.state.country)
    }
    render() {
        return(
            <span><p id={"country_p"}>{this.state.country.country_name}</p><img src={this.state.country.country_banner} width={20} height={20} id={"country_img"}/></span>
        )
    }
}


export default Country