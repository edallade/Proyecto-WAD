/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class prueba extends React.Component {
    constructor(){
        super();
        this.sube = this.sube.bind(this);
    }
    
    sube(){
        var h = new Headers();
    }
    render(){
        retur(
                <div>
        <form actions="#">
        <input type="file" id="archivo" accept="image/x-png"/>
        <button onClick={this.sube} id="bot">subir archivo</button>
        </form>
        
                </div>
        );
    }
};
ReactDOM.render (<prueba />,document.getElementById('prueba'));
