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
