/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Prueba extends React.Component {
    constructor(){
        super();
        this.sube = this.sube.bind(this);
    }
    
    sube(e){
    fetch('http://localhost:8080/Proyecto_WAD_Struts-React/ServletUpload', {
 // content-type header should not be specified!
    method: 'POST',
    body: document.getElementById("archivo").files[0]
  })
    .then(response => response.json())
    .then(success => {
      // Do something with the successful response
    })
    .catch(error => console.log(error)
  );
}
    
    render(){
        return(
                <div>
        <form actions="">
        <input type="file" id="archivo" accept="image/x-png"/>
        <button onClick={this.sube} id="bot">subir archivo</button>
        </form>
        
                </div>
        );
    }
};
ReactDOM.render (<Prueba />,document.getElementById('prueba'));
